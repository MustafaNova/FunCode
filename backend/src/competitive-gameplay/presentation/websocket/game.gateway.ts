import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import type {
    CreateNewRoom1v1Event,
    ErrorEvent,
    NotifyRoomEvent,
    RoomSocket,
    SolutionSubmit,
} from './interfaces';
import { UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BattleEvent } from '../../domain/battle.events';
import { RoomGuard } from './guards/room.guard';
import { GameService } from './game.service';

@WebSocketGateway()
export class GameGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
    constructor(private readonly gs: GameService) {}

    afterInit(server: Server): any {
        this.gs.setServer(server);
    }

    handleConnection(client: Socket): any {
        const auth = client.handshake.headers.authorization as string;
        const token = auth?.split(' ')[1];
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
    notifyBattleRoom({ roomId, event, msg }: NotifyRoomEvent) {
        this.gs.sendRoom(roomId, event, msg);
    }

    @OnEvent(BattleEvent.ERROR)
    reportError({ userId, code, msg }: ErrorEvent) {
        this.gs.sendError(userId, code, msg);
    }

    @UseGuards(RoomGuard)
    @SubscribeMessage('PLAYER_READY')
    handlePlayerReady(client: RoomSocket) {
        console.log('PLAYER_READY MESSAGE ARRIVED');
        const userId = client.data.user.userId;
        const roomId = client.data.room;
        this.gs.playerReady(userId, roomId, client.data.roomSize);
    }

    @UseGuards(RoomGuard)
    @SubscribeMessage('SUBMIT_SOLUTION')
    handleSolutionSubmit(
        client: RoomSocket,
        @MessageBody() payload: SolutionSubmit,
    ) {
        this.gs.solutionSubmit(
            client.data.user.userId,
            client.data.room,
            client.data.user.username,
            payload.taskId,
            payload.solution,
        );
    }
}
