import { Injectable } from '@nestjs/common';
import { PlayerGatewayPort } from '../../application/ports/outbound/player.gateway.port';
import { LoseRes, SOCKET_EVENTS, WinRes } from '@funcode/shared';
import { GameGatewayRegistry } from '../GameGatewayRegistry/gameGatewayRegistry';

@Injectable()
export class PlayerGatewayAdapter implements PlayerGatewayPort {
    constructor(
        private readonly gameGateWayRegistry: GameGatewayRegistry
    ) {}

    async joinPlayersToRoom1v1(
        roomId: string,
        userId1: string,
        userId2: string,
    ): Promise<void> {
        const player1 = this.gameGateWayRegistry.getPlayer(userId1)!;
        const player2 = this.gameGateWayRegistry.getPlayer(userId2)!;
        player1.data.room = roomId;
        player2.data.room = roomId;
        await player1.join(roomId);
        await player2.join(roomId);
    }

    async closeRoom(roomId: string) {
        const room = await this.gameGateWayRegistry.getServer().in(roomId).fetchSockets();
        for (const socket of room) {
            socket.leave(roomId);
        }
    }

    notifyRoom<T>(roomId: string, event: string, payload: T): void {
        this.gameGateWayRegistry.getServer().to(roomId).emit(event, payload);
    }

    notifyPlayer<T>(userId: string, event: SOCKET_EVENTS, payload?: T) {
        const client = this.gameGateWayRegistry.getPlayer(userId);
        if (!client) return;
        client.emit(event, payload);
    }

}
