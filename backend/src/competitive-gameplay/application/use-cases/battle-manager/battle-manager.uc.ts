import { BattleManagerPort } from '../../ports/inbound/battle.manager.port';
import { Battle1vs1, PlayerInfo } from '../../../domain/entities/battle1vs1';
import type { PlayerGatewayPort } from '../../ports/outbound/player.gateway.port';
import { ReadyPlayerCmd } from './dtos/ready.player.cmd';
import { SubmitCmd } from './dtos/submit.cmd';
import { LoseRes, SubmitResponse, WinRes, SOCKET_EVENTS } from '@funcode/shared';
import type { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';
import type { ChallengeRepositoryPort } from '../../ports/outbound/challenge.repository.port';
import type { ValidatorPort } from '../../ports/inbound/validator.port';
import { RoomId, UserId } from '../../../domain/types/players';
import { toTaskDto } from './mappers/task.mapper';

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
        this.playerGateway.notifyRoom(roomId, SOCKET_EVENTS.MATCH_FOUND, msg);

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
            const task = toTaskDto(this.challengeRepo.getRandomTask());
            this.playerGateway.notifyRoom(
                roomId,
                SOCKET_EVENTS.BATTLE_STARTED,
                { task },
            );
        }
    }

    async handleSolutionSubmit(submit: SubmitCmd) {
        const res = this.validator.checkSubmit(submit.taskId, submit.solution);
        await this.notifySubmitRes(res, submit);
    }

    private async notifySubmitRes(res: boolean, submit: SubmitCmd) {
        if (res) {
            const winnerId = submit.userId;
            const winPayload: WinRes = {
                playerName: submit.playerName,
                solution: submit.solution,
            };
            this.playerGateway.notifyPlayerWin(winnerId, winPayload);

            const loserPlayer = this.getLoserId(
                winnerId,
                this.roomToPlayers.get(submit.roomId)!,
            );
            const losePayload: LoseRes = {
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
            const payload: SubmitResponse = {
                type: 'wrong',
                playerName: submit.playerName,
            };

            this.playerGateway.notifyRoom(
                submit.roomId,
                SOCKET_EVENTS.WRONG_SUBMIT,
                payload,
            );
        }
    }

    private handleError(userId: string, err: Error) {
        this.playerGateway.reportError(userId, 407, err.message);
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
