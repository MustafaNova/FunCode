import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { UserId } from '../../domain/types/players';
import { GameSocket } from '../../presentation/websocket/interfaces';


@Injectable()
export class GameGatewayRegistry {
    private server!: Server;

    private readonly connectedPlayers =
        new Map<UserId, GameSocket>();

    setServer(server: Server): void {
        this.server = server;
    }

    getServer(): Server {
        return this.server;
    }

    addPlayer(userId: UserId, socket: GameSocket): void {
        this.connectedPlayers.set(userId, socket);
    }

    removePlayer(socketId: string): void {
        for (const [userId, socket] of this.connectedPlayers) {
            if (socket.id === socketId) {
                this.connectedPlayers.delete(userId);
                return;
            }
        }
    }

    getPlayer(userId: UserId): GameSocket | undefined {
        return this.connectedPlayers.get(userId);
    }
}