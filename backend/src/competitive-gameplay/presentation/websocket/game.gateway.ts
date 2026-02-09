import {
    OnGatewayConnection,
    OnGatewayDisconnect, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';

interface Payload {
    userId: string;
    username: string;
    iat: number;
    exp: number;
}

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    private connectedPlayers = new Map<string, Socket>();
    private readyPlayers = new Map<string, Set<string>>();

    handleConnection(client: Socket): any {
        const token = client.handshake.headers.authorization as string;
        if (!token) {
            this.disconnectUnauthorized(client);
            return;
        }
        try {
            const payload = verify(token, 'test') as Payload;
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
        await player1?.join(roomId);
        await player2?.join(roomId);
    }

    notifyRoom1v1(roomId: string, name1: string, name2: string, msg: string) {
        this.server.to(roomId).emit('MATCH_FOUND', {
            message: msg,
            prompt: 'Are you ready ?',
            players: [name1, name2],
        });
    }

    @SubscribeMessage('PLAYER_READY')
    handlePlayerReady(client: Socket) {

    }
}
