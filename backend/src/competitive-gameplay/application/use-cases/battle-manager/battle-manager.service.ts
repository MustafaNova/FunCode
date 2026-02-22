import { Inject, Injectable } from '@nestjs/common';
import { BattleManagerPort } from '../../ports/inbound/battle.manager.port';
import { Battle1vs1, PlayerInfo } from '../../../domain/entities/battle1vs1';
import { randomUUID } from 'node:crypto';
import type { PlayerGatewayPort } from '../../ports/outbound/player.gateway.port';
import { PLAYER_GATEWAY_PORT } from '../../../infrastructure/playerGateway/token';
import { BattleNotification } from '../../../domain/battle.notifs';
import TaskService from './tasks/task.service';
import { ReadyPlayerCmd } from './dtos/ready.player.cmd';
import { SubmitCmd } from './dtos/submit.cmd';
import { AppError } from './interfaces';
import { SubmitRes } from './dtos/submit.res';

@Injectable()
export class BattleManagerService implements BattleManagerPort {
    connectedPlayers = new Set<string>();
    roomToPlayers = new Map<string, PlayerInfo[]>();
    private readyPlayers = new Map<string, Set<string>>();

    constructor(
        @Inject(PLAYER_GATEWAY_PORT)
        private readonly playerGateway: PlayerGatewayPort,
        private readonly taskService: TaskService,
    ) {}

    async on1v1Created(battle: Battle1vs1): Promise<void> {
        const roomId = randomUUID();
        const p1 = battle.player1;
        const p2 = battle.player2;
        console.log(`creating now 1v1 for ${p1.username} and ${p2.username}`);
        this.roomToPlayers.set(roomId, [p1, p2]);
        await this.playerGateway.joinPlayersToRoom1v1(
            roomId,
            p1.userId,
            p2.userId,
        );

        const msg = { match: `${p1.username} vs ${p2.username}` };
        this.playerGateway.notifyRoom(
            roomId,
            BattleNotification.MATCH_FOUND,
            msg,
        );

        return Promise.resolve();
    }

    handleReadyPlayer(readyPlayer: ReadyPlayerCmd) {
        const { userId, roomId, roomSize } = readyPlayer;
        if (!this.readyPlayers.has(roomId)) {
            this.readyPlayers.set(roomId, new Set<string>());
        }

        const readyRoom = this.readyPlayers.get(roomId)!;
        readyRoom.add(userId);

        if (roomSize == readyRoom.size) {
            console.log(`Battle has started: ${roomId}`);
            this.readyPlayers.delete(roomId);
            this.playerGateway.notifyRoom(
                roomId,
                BattleNotification.START_BATTLE,
                this.taskService.getRandomTask(),
            );
        }
    }

    handleSolutionSubmit(submit: SubmitCmd) {
        try {
            const res = this.taskService.checkSubmit(
                submit.taskId,
                submit.solution,
            );
            this.notifySubmitRes(res, submit);
        } catch (err) {
            this.handleError(submit.userId, err);
        }
    }

    private notifySubmitRes(res: boolean, submit: SubmitCmd) {
        const payload: SubmitRes = {
            status: res ? 'success' : 'failed',
            playerName: submit.playerName,
            solution: res ? submit.solution : undefined,
        };

        this.playerGateway.notifyRoom(
            submit.roomId,
            res ? BattleNotification.WIN : BattleNotification.WRONG_SUBMIT,
            payload,
        );

        if (res) {
            this.roomToPlayers.delete(submit.roomId);
            this.playerGateway.closeRoom(submit.roomId);
        }
    }

    private handleError(userId: string, err: AppError) {
        this.playerGateway.reportError(userId, err.code, err.message);
    }

    registerNewPlayer(userId: string) {
        this.connectedPlayers.add(userId);
    }
}
