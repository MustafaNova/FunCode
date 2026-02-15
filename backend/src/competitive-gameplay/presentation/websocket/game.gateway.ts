import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import type {
    CreateNewRoom1v1Event,
    GameSocket,
    NotifyRoomEvent,
    Payload,
    RoomSocket,
    SolutionSubmit,
} from './interfaces';
import type { BattleManagerPort } from '../../application/ports/inbound/battle.manager.port';
import { BATTLE_MANAGER_PORT } from '../../application/tokens';
import { Inject, UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BattleEvent } from '../../domain/battle.events';
import { ReadyPlayerCmd } from '../../application/use-cases/battle-manager/dtos/ready.player.cmd';
import { SubmitCmd } from '../../application/use-cases/battle-manager/dtos/submit.cmd';
import { RoomGuard } from './guards/room.guard';
import { GameService } from './game.service';

@WebSocketGateway()
export class GameGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
    constructor(
        @Inject(BATTLE_MANAGER_PORT)
        private readonly battleManager: BattleManagerPort,
        private readonly gs: GameService,
    ) {}

    @WebSocketServer()
    server: Server;
    private connectedPlayers = new Map<string, GameSocket>();

    afterInit(server: Server): any {
        this.gs.setServer(server);
    }

    handleConnection(client: Socket): any {
        const auth = client.handshake.headers.authorization as string;
        const token = auth?.split(' ')[1];
        if (!token) {
            this.disconnectUnauthorized(client);
            return;
        }
        try {
            const payload = verify(token, 'test') as Payload;
            client.data.user = payload; // eslint-disable-line
            this.connectedPlayers.set(payload.userId, client as GameSocket);
        } catch {
            this.disconnectUnauthorized(client);
        }
    }

    handleDisconnect(client: Socket): any {
        for (const [key, value] of this.connectedPlayers.entries()) {
            if (value.id == client.id) {
                this.connectedPlayers.delete(key);
                break;
            }
        }
    }

    private disconnectUnauthorized(client: Socket) {
        this.gs.sendClient(client, 'unauthorized', 'token is missing');
        client.disconnect();
    }

    @OnEvent(BattleEvent.CREATE_1V1)
    async createNewRoom1v1(payload: CreateNewRoom1v1Event) {
        const { roomId, userId1, userId2 } = payload;
        const player1 = this.connectedPlayers.get(userId1)!;
        const player2 = this.connectedPlayers.get(userId2)!;
        player1.data.room = roomId;
        player2.data.room = roomId;
        await player1.join(roomId);
        await player2.join(roomId);
    }

    @OnEvent(BattleEvent.ROOM_NOTIFICATION)
    notifyBattleRoom({ roomId, event, msg }: NotifyRoomEvent) {
        this.gs.sendRoom(roomId, event, msg);
    }

    @UseGuards(RoomGuard)
    @SubscribeMessage('PLAYER_READY')
    handlePlayerReady(client: RoomSocket) {
        console.log('PLAYER_READY MESSAGE ARRIVED');
        const userId = client.data.user.userId;
        const roomId = client.data.room;

        this.battleManager.handleReadyPlayer(
            ReadyPlayerCmd.create(userId, roomId, client.data.roomSize),
        );
    }

    @UseGuards(RoomGuard)
    @SubscribeMessage('SUBMIT_SOLUTION')
    handleSolutionSubmit(
        client: RoomSocket,
        @MessageBody() payload: SolutionSubmit,
    ) {
        this.battleManager.handleSolutionSubmit(
            SubmitCmd.create(
                client.data.room,
                client.data.user.username,
                payload.solution,
            ),
        );
    }
}
