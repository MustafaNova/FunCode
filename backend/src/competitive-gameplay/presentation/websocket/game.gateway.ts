import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import type { AuthenticatedSocket, Payload } from './interfaces';
import type { BattleManagerPort } from '../../application/ports/inbound/battle.manager.port';
import { BATTLE_MANAGER_PORT } from '../../application/tokens';
import { Inject } from '@nestjs/common';

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        @Inject(BATTLE_MANAGER_PORT)
        private readonly battleManager: BattleManagerPort,
    ) {}

    @WebSocketServer()
    server: Server;
    private connectedPlayers = new Map<string, AuthenticatedSocket>();

    handleConnection(client: AuthenticatedSocket): any {
        const auth = client.handshake.headers.authorization as string;
        const token = auth?.split(' ')[1];
        if (!token) {
            this.disconnectUnauthorized(client);
            return;
        }
        try {
            const payload = verify(token, 'test') as Payload;
            client.data.user = payload;
            this.connectedPlayers.set(payload.userId, client);
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
        client.emit('unauthorized', { message: 'token is missing' });
        client.disconnect();
    }

    async createNewRoom1v1(roomId: string, userId1: string, userId2: string) {
        const player1 = this.connectedPlayers.get(userId1);
        const player2 = this.connectedPlayers.get(userId2);
        this.connectedPlayers.get(userId1)!.data.room = roomId;
        this.connectedPlayers.get(userId2)!.data.room = roomId;
        await player1?.join(roomId);
        await player2?.join(roomId);
    }

    notifyBattleRoom(roomId: string, event: string, msg: string) {
        this.server.to(roomId).emit(event, {
            message: msg,
        });
    }

    @SubscribeMessage('PLAYER_READY')
    handlePlayerReady(client: AuthenticatedSocket) {
        const userId = client.data.user?.userId as string;
        const roomId = client.data.room;

        if (!roomId) {
            client.emit('ERROR', {
                code: 'ROOM_ERROR',
                msg: 'No room was joined',
            });
            return;
        }

        const room = this.server.sockets.adapter.rooms.get(roomId);
        if (!room) {
            client.emit('ERROR', {
                code: 'ROOM_ERROR',
                msg: 'Room does not exist',
            });
            return;
        }

        this.battleManager.handleReadyPlayers(userId, roomId, room.size);
    }
}
