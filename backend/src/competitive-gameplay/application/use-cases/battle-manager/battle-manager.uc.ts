import { BattleManagerPort } from '../../ports/inbound/battle.manager.port';
import { Battle1v1 } from '../../../domain/entities/battle1v1';
import type { PlayerGatewayPort } from '../../ports/outbound/player.gateway.port';
import { ReadyPlayerCmd } from './dtos/ready.player.cmd';
import {
    BattleAbortedPayload,
    BugHunterBattleStartedPayload,
    ClassicBattleStartedPayload,
    CodeGolfBattleStartedPayload,
    ERROR_CODES, ErrorCode,
    SOCKET_EVENTS,
} from '@funcode/shared';
import type { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';
import { RoomId, UserId } from '../../../domain/types/players';
import { ArenaTaskProviderPort } from '../../ports/outbound/arena.task.provider.port';
import { CodeGolfMatchStatePort } from '../../ports/outbound/codeGolfMatchState.port';
import { CODE_GOLF_DURATION_MS } from '../../../domain/constants/codeGolf.constants';


export class BattleManagerUC implements BattleManagerPort {
    private readyPlayers = new Map<RoomId, Set<UserId>>();

    constructor(
        private readonly playerGateway: PlayerGatewayPort,
        private readonly battleRepo: BattleRepositoryPort,
        private readonly arenaTaskProvider: ArenaTaskProviderPort,
        private readonly codeGolfMatchState: CodeGolfMatchStatePort,
    ) {}

    async on1v1Created(battle: Battle1v1): Promise<void> {
        const roomId = battle.roomId!;
        const p1 = battle.player1;
        const p2 = battle.player2;
        await this.playerGateway.joinPlayersToRoom1v1(
            roomId,
            p1.userId,
            p2.userId,
        );

        this.playerGateway.notifyRoom(roomId, SOCKET_EVENTS.MATCH_FOUND);

    }

    async handleReadyPlayer(readyPlayer: ReadyPlayerCmd) {
        const { userId, roomId, roomSize } = readyPlayer;
        if (!this.readyPlayers.has(roomId)) {
            this.readyPlayers.set(roomId, new Set<string>());
        }

        const readyRoom = this.readyPlayers.get(roomId)!;
        readyRoom.add(userId);
        if (roomSize !== readyRoom.size) return;

        this.readyPlayers.delete(roomId);

        const battle = await this.battleRepo.getByRoomId(roomId);

        if (!battle) {
            this.playerGateway.notifyRoom<BattleAbortedPayload>(
                roomId,
                SOCKET_EVENTS.BATTLE_ABORTED,
                { code: ERROR_CODES.BATTLE_NOT_FOUND }
            )
            return;
        }

        this.startBattle(battle);

    }

    private startBattle(battle: Battle1v1) {
        switch (battle.gameModeId) {
            case 'classic-unranked-1v1':
                this.startClassicBattle(battle);
                break;

            case 'code-golf-unranked-1v1':
                this.startCodeGolfBattle(battle);
                break;

            case 'bug-hunter-unranked-1v1':
                this.startBugHunterBattle(battle);
                break;
        }
    }

    private startClassicBattle(battle: Battle1v1) {
        const task =
            this.arenaTaskProvider.getRandomTaskDto(
                'classic-unranked-1v1'
            );

        this.playerGateway.notifyRoom<ClassicBattleStartedPayload>(
            battle.roomId,
            SOCKET_EVENTS.BATTLE_STARTED,
            { task },
        );
    }

    private startCodeGolfBattle(battle: Battle1v1) {
        const task =
            this.arenaTaskProvider.getRandomTaskDto(
               'code-golf-unranked-1v1'
            );

        const endsAt = Date.now() + CODE_GOLF_DURATION_MS;

        this.playerGateway.notifyRoom<CodeGolfBattleStartedPayload>(
            battle.roomId,
            SOCKET_EVENTS.BATTLE_STARTED,
            { task, endsAt },
        );

        this.codeGolfMatchState.create(battle.roomId, {
            taskId: task.id,
            playerScores: new Map([
                [battle.player1.userId, task.code.length],
                [battle.player2.userId, task.code.length],
            ]),
            endsAt,
            instantWinLimit: task.instantWinLimit
        })

        const timer= setTimeout(() => {
            void this.finishCodeGolfBattle(battle);
        }, Math.max(0, endsAt - Date.now()));

        this.codeGolfMatchState.setTimer(battle.roomId, timer);

    }

    private async finishCodeGolfBattle(battle: Battle1v1) {
        const scores = this.codeGolfMatchState.getScores(battle.roomId);

        if (!scores) {
            await this.abortCodeGolfBattle(
                battle.roomId,
                ERROR_CODES.CODE_GOLF_MATCH_STATE_INVALID
            );
            return;
        }

        const userId1= battle.player1.userId;
        const userId2= battle.player2.userId;
        const player1Score = scores.get(userId1);
        const player2Score = scores.get(userId2);

        if (player1Score === undefined || player2Score === undefined) {
            await this.abortCodeGolfBattle(
                battle.roomId,
                ERROR_CODES.CODE_GOLF_MATCH_STATE_INVALID
            );
            return;
        }

        let winnerId: string | null = null;

        if (player1Score === player2Score) {
            this.playerGateway.notifyRoom(
                battle.roomId,
                SOCKET_EVENTS.DRAW
            )
        } else {
            winnerId =
                player1Score < player2Score ? userId1 : userId2;

            const loserId =
                player1Score < player2Score ? userId2 : userId1;

            this.playerGateway.notifyPlayer(
                winnerId,
                SOCKET_EVENTS.WIN
            );

            this.playerGateway.notifyPlayer(
                loserId,
                SOCKET_EVENTS.LOSE
            );
        }

        if (winnerId !== null) {
            await this.battleRepo.setWinner(battle.roomId, winnerId);
        }

        await this.playerGateway.closeRoom(battle.roomId);
        this.codeGolfMatchState.delete(battle.roomId);
    }

    private async abortCodeGolfBattle(roomId: string, code: ErrorCode) {
        this.playerGateway.notifyRoom<BattleAbortedPayload>(
            roomId,
            SOCKET_EVENTS.BATTLE_ABORTED,
            { code }
        )
        await this.playerGateway.closeRoom(roomId);
        this.codeGolfMatchState.delete(roomId);
    }

    private startBugHunterBattle(battle: Battle1v1) {
        const task =
            this.arenaTaskProvider.getRandomTaskDto(
                'bug-hunter-unranked-1v1'
            );

        this.playerGateway.notifyRoom<BugHunterBattleStartedPayload>(
            battle.roomId,
            SOCKET_EVENTS.BATTLE_STARTED,
            { task },
        );
    }

}
