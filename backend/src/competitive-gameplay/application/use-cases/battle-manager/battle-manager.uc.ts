import { BattleManagerPort } from '../../ports/inbound/battle.manager.port';
import { Battle1vs1, PlayerInfo } from '../../../domain/entities/battle1vs1';
import type { PlayerGatewayPort } from '../../ports/outbound/player.gateway.port';
import { BattleNotification } from '../../../domain/enums/battle.notification';
import { ReadyPlayerCmd } from './dtos/ready.player.cmd';
import { SubmitCmd } from './dtos/submit.cmd';
import { AppError } from './interfaces';
import { SubmitRes } from '@funcode/shared';
import type { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';
import type { ChallengeRepositoryPort } from '../../ports/outbound/challenge.repository.port';
import type { ValidatorPort } from '../../ports/inbound/validator.port';
import {
    LosePayload,
    WinPayload,
} from '../../../domain/value-objects/payloads';
import { RoomId, UserId } from '../../../domain/types/players';

export class BattleManagerUC implements BattleManagerPort {
    connectedPlayers = new Set<UserId>();
    roomToPlayers = new Map<RoomId, PlayerInfo[]>();
    private readyPlayers = new Map<RoomId, Set<UserId>>();

    constructor(
        private readonly playerGateway: PlayerGatewayPort,
        private readonly challengeRepo: ChallengeRepositoryPort,
        private readonly validator: ValidatorPort,
        private readonly battleRepo: BattleRepositoryPort,
    ) {}

    async on1v1Created(battle: Battle1vs1): Promise<void> {
        const roomId = battle.roomId!;
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
                this.challengeRepo.getRandomTask(),
            );
        }
    }

    async handleSolutionSubmit(submit: SubmitCmd) {
        try {
            const res = this.validator.checkSubmit(
                submit.taskId,
                submit.solution,
            );
            await this.notifySubmitRes(res, submit);
        } catch (err) {
            this.handleError(submit.userId, err);
        }
    }

    private async notifySubmitRes(res: boolean, submit: SubmitCmd) {
        if (res) {
            const winnerId = submit.userId;
            const winPayload: WinPayload = {
                playerName: submit.playerName,
                solution: submit.solution,
            };
            this.playerGateway.notifyPlayerWin(winnerId, winPayload);

            const loserPlayer = this.getLoserId(
                winnerId,
                this.roomToPlayers.get(submit.roomId)!,
            );
            const losePayload: LosePayload = {
                playerName: loserPlayer!.username,
                solution: submit.solution,
            };

            this.playerGateway.notifyPlayerLose(
                loserPlayer!.userId,
                losePayload,
            );

            this.roomToPlayers.delete(submit.roomId);
            await this.playerGateway.closeRoom(submit.roomId);
            await this.battleRepo.setWinner(submit.roomId, submit.userId);
        } else {
            const payload: SubmitRes = {
                status: 'failed',
                playerName: submit.playerName,
                solution: undefined,
            };

            this.playerGateway.notifyRoom(
                submit.roomId,
                BattleNotification.WRONG_SUBMIT,
                payload,
            );
        }
    }

    private handleError(userId: string, err: AppError) {
        this.playerGateway.reportError(userId, err.code, err.message);
    }

    registerNewPlayer(userId: string) {
        this.connectedPlayers.add(userId);
    }

    private getLoserId(winnerId: UserId, players: PlayerInfo[]) {
        for (const player of players) {
            if (player.userId != winnerId) {
                return player;
            }
        }
    }
}
