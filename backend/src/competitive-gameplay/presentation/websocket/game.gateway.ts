import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { type JoinMatchmakingPayload, type LeaveMatchmakingPayload, SOCKET_EVENTS, type SubmitPayload } from '@funcode/shared';
import { Server, Socket } from 'socket.io';
import type {
    GameSocket,
    Payload,
    RoomSocket,
} from './interfaces';
import { Inject, UseFilters, UseGuards } from '@nestjs/common';
import { RoomGuard } from './guards/room.guard';
import { WsExceptionFilter } from '../../../common/ws.exception.filter';
import { type JoinMatchMakingPort } from '../../application/ports/inbound/join-matchmaking.port';
import {
    BATTLE_MANAGER_PORT,
    JOIN_MATCHMAKING_PORT,
    LEAVE_MATCHMAKING_PORT, SUBMIT_ARENA_SOLUTION_PORT
} from '../../infrastructure/uc-wiring/tokens';
import { type LeaveMatchmakingPort } from '../../application/ports/inbound/leave-matchmaking.port';
import { SubmitCmd } from '../../application/use-cases/battle-manager/dtos/submit.cmd';
import type { BattleManagerPort } from '../../application/ports/inbound/battle.manager.port';
import { ReadyPlayerCmd } from '../../application/use-cases/battle-manager/dtos/ready.player.cmd';
import { GameGatewayRegistry } from '../../infrastructure/GameGatewayRegistry/gameGatewayRegistry';
import { verify } from 'jsonwebtoken';
import { type SubmitArenaSolutionPort } from '../../application/ports/inbound/submitArenaSolution.port';

@UseFilters(WsExceptionFilter)
@WebSocketGateway({
    namespace: '/game',
    cors: {
        origin: process.env['FRONTEND_URL'],
        credentials: true,
    },
})
export class GameGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
    constructor(
        @Inject(JOIN_MATCHMAKING_PORT)
        private readonly joinMatchmakingUC: JoinMatchMakingPort,
        @Inject(LEAVE_MATCHMAKING_PORT)
        private readonly leaveMatchmakingUC: LeaveMatchmakingPort,
        @Inject(BATTLE_MANAGER_PORT)
        private readonly battleManager: BattleManagerPort,
        @Inject(SUBMIT_ARENA_SOLUTION_PORT)
        private readonly submitArenaSolutionUC: SubmitArenaSolutionPort,
        private readonly gameGatewayRegistry: GameGatewayRegistry,
    ) {}

    afterInit(server: Server): any {
        this.gameGatewayRegistry.setServer(server);
    }

    handleConnection(client: Socket): any {
        const token = client.handshake.auth.token;
        if (!token) {
            this.disconnectUnauthorized(client);
            return;
        }
        try {
            const payload = verify(token, process.env['JWT_SECRET']!) as Payload;
            client.data.user = payload; // eslint-disable-line
            this.gameGatewayRegistry.addPlayer(payload.userId, client as GameSocket);
        } catch {
            this.disconnectUnauthorized(client);
        }
    }

    handleDisconnect(client: Socket): any {
        this.gameGatewayRegistry.removePlayer(client.id);
    }

    @UseGuards(RoomGuard)
    @SubscribeMessage(SOCKET_EVENTS.PLAYER_READY)
    async handlePlayerReady(client: RoomSocket) {
        await this.battleManager.handleReadyPlayer(
            ReadyPlayerCmd.create(
                client.data.user.userId,
                client.data.room,
                client.data.roomSize
            ),
        );
    }

    @UseGuards(RoomGuard)
    @SubscribeMessage(SOCKET_EVENTS.SUBMIT_SOLUTION)
    async handleSolutionSubmit(client: RoomSocket, payload: SubmitPayload) {
        console.log('GATEWAY');
        await this.submitArenaSolutionUC.submit(
            SubmitCmd.create(
                client.data.user.userId,
                client.data.room,
                client.data.user.username,
                payload.taskId,
                payload.solution,
            ),
        );
    }

    @SubscribeMessage(SOCKET_EVENTS.JOIN_MATCHMAKING)
    async joinMatchmaking(client: GameSocket, payload: JoinMatchmakingPayload) {
        await this.joinMatchmakingUC.join({
            userId: client.data.user.userId,
            username: client.data.user.username,
            gameModeId: payload.gameModeId
        })
    }

    @SubscribeMessage(SOCKET_EVENTS.LEAVE_MATCHMAKING)
    async leaveMatchmaking(client: GameSocket, payload: LeaveMatchmakingPayload) {
        await this.leaveMatchmakingUC.leave({
            userId: client.data.user.userId,
            username: client.data.user.username,
            gameModeId: payload.gameModeId
        })
    }

    private disconnectUnauthorized(client: Socket) {
        client.emit('unauthorized', { msg: 'no valid token' });
        client.disconnect();
    }
}
