import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { PlayerInfo } from '../../domain/entities/battle1vs1';

interface Payload {
    userId: string;
    username: string;
    iat: number;
    exp: number;
}

interface Player {
    userId: string;
    username: string;
    socket: Socket;
}

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private connectedPlayers = new Map<string, Socket>();

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
}
