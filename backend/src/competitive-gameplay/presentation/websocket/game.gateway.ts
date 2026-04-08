import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import type { SubmitReq } from '@funcode/shared';
import { Server, Socket } from 'socket.io';
import type {
    CreateNewRoom1v1Event,
    ErrorEvent,
    LoseEvent,
    NotifyRoomEvent,
    RoomSocket,
    WinEvent,
} from './interfaces';
import { UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BattleEvent } from '../../domain/enums/battle.events';
import { RoomGuard } from './guards/room.guard';
import { GameService } from './game.service';
import { FRONTEND_URL } from '../../../constants';

@WebSocketGateway({
    cors: {
        origin: FRONTEND_URL,
        credentials: true,
    },
})
export class GameGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
    constructor(private readonly gs: GameService) {}

    afterInit(server: Server): any {
        this.gs.setServer(server);
    }

    handleConnection(client: Socket): any {
        const token = this.gs.getTokenFromCookie(
            client.handshake.headers.cookie,
        );
        this.gs.registerNewPlayer(client, token);
    }

    handleDisconnect(client: Socket): any {
        this.gs.unRegisterPlayer(client.id);
    }

    @OnEvent(BattleEvent.CREATE_1V1)
    async createNewRoom1v1({
        roomId,
        userId1,
        userId2,
    }: CreateNewRoom1v1Event) {
        await this.gs.createNewRoom1v1(roomId, userId1, userId2);
    }

    @OnEvent(BattleEvent.ROOM_NOTIFICATION)
    notifyRoom({ roomId, event, msg }: NotifyRoomEvent) {
        this.gs.sendRoom(roomId, event, msg);
    }

    @OnEvent(BattleEvent.ERROR)
    reportError({ userId, code, msg }: ErrorEvent) {
        this.gs.sendError(userId, code, msg);
    }

    @OnEvent(BattleEvent.CLOSE_ROOM)
    async closeRoom(roomId: string) {
        await this.gs.closeRoom(roomId);
    }

    @OnEvent(BattleEvent.WIN_NOTIFICATION)
    notifyWin({ userId, payload }: WinEvent) {
        this.gs.notifyWin(userId, payload);
    }

    @OnEvent(BattleEvent.LOSE_NOTIFICATION)
    notifyLose({ userId, payload }: LoseEvent) {
        this.gs.notifyLose(userId, payload);
    }

    @UseGuards(RoomGuard)
    @SubscribeMessage('PLAYER_READY')
    handlePlayerReady(client: RoomSocket) {
        console.log('PLAYER_READY MESSAGE ARRIVED!!!');
        const userId = client.data.user.userId;
        const roomId = client.data.room;
        this.gs.playerReady(userId, roomId, client.data.roomSize);
    }

    @UseGuards(RoomGuard)
    @SubscribeMessage('SUBMIT_SOLUTION')
    async handleSolutionSubmit(client: RoomSocket, payload: SubmitReq) {
        console.log('NEW SUBMIT_SOLUTION ARRIVED');
        await this.gs.solutionSubmit(
            client.data.user.userId,
            client.data.room,
            client.data.user.username,
            payload.taskId,
            payload.solution,
        );
    }
}
