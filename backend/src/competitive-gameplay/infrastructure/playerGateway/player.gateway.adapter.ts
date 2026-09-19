import { Injectable } from '@nestjs/common';
import { PlayerGatewayPort } from '../../application/ports/outbound/player.gateway.port';
import { LoseRes, WinRes } from '@funcode/shared';
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

    notifyRoom(roomId: string, event: string, msg: unknown): void {
        this.gameGateWayRegistry.getServer().to(roomId).emit(event, msg);
    }

    notifyPlayerWin(userId: string, payload: WinRes) {
        const client = this.gameGateWayRegistry.getPlayer(userId);
        if (!client) return;
        client.emit('WIN', payload);
    }

    notifyPlayerLose(userId: string, payload: LoseRes) {
        const client = this.gameGateWayRegistry.getPlayer(userId);
        if (!client) return;
        client.emit('LOSE', payload);
    }

}
