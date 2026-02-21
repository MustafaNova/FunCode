import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import type { GameSocket, Payload } from './interfaces';
import { verify } from 'jsonwebtoken';
import { BATTLE_MANAGER_PORT } from '../../application/tokens';
import type { BattleManagerPort } from '../../application/ports/inbound/battle.manager.port';
import { ReadyPlayerCmd } from '../../application/use-cases/battle-manager/dtos/ready.player.cmd';
import { SubmitCmd } from '../../application/use-cases/battle-manager/dtos/submit.cmd';

@Injectable()
export class GameService {
    constructor(
        @Inject(BATTLE_MANAGER_PORT)
        private readonly battleManager: BattleManagerPort,
    ) {}

    private server: Server;
    private connectedPlayers = new Map<string, GameSocket>();

    setServer(server: Server) {
        this.server = server;
    }

    getRoom(roomId: string) {
        return this.server.sockets.adapter.rooms.get(roomId);
    }

    sendClient(client: Socket, event: string, msg: string) {
        client.emit(event, { msg: msg });
    }

    sendError(userId: string, code: number, msg: string) {
        this.connectedPlayers.get(userId)?.emit('ERROR', { code, msg });
    }

    sendRoom(roomId: string, event: string, msg: unknown) {
        this.server.to(roomId).emit(event, msg);
    }

    registerNewPlayer(client: Socket, token: string) {
        if (!token) {
            this.disconnectUnauthorized(client);
            return;
        }
        try {
            const payload = verify(token, 'test') as Payload;
            client.data.user = payload; // eslint-disable-line
            this.connectedPlayers.set(payload.userId, client as GameSocket);
            this.battleManager.registerNewPlayer(payload.userId);
        } catch {
            this.disconnectUnauthorized(client);
        }
    }

    unRegisterPlayer(socketId: string) {
        for (const [key, value] of this.connectedPlayers.entries()) {
            if (value.id == socketId) {
                this.connectedPlayers.delete(key);
                break;
            }
        }
    }

    private disconnectUnauthorized(client: Socket) {
        this.sendClient(client, 'unauthorized', 'no valid token');
        client.disconnect();
    }

    async createNewRoom1v1(roomId: string, userId1: string, userId2: string) {
        const player1 = this.connectedPlayers.get(userId1)!;
        const player2 = this.connectedPlayers.get(userId2)!;
        player1.data.room = roomId;
        player2.data.room = roomId;
        await player1.join(roomId);
        await player2.join(roomId);
    }

    playerReady(userId: string, roomId: string, roomSize: number) {
        this.battleManager.handleReadyPlayer(
            ReadyPlayerCmd.create(userId, roomId, roomSize),
        );
    }

    solutionSubmit(
        userId: string,
        roomId: string,
        playerName: string,
        taskId: string,
        solution: string,
    ) {
        this.battleManager.handleSolutionSubmit(
            SubmitCmd.create(userId, roomId, playerName, taskId, solution),
        );
    }

    closeRoom(roomId: string) {
        const room = this.server.sockets.adapter.rooms.get(roomId);
        if (room) {
            for (const socketId of room) {
                const socket = this.server.sockets.sockets.get(socketId);
                void socket?.leave(roomId);
            }
        }
    }
}
