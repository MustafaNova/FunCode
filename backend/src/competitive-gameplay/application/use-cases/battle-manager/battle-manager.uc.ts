import { BattleManagerPort } from '../../ports/inbound/battle.manager.port';
import { Battle1v1 } from '../../../domain/entities/battle1v1';
import type { PlayerGatewayPort } from '../../ports/outbound/player.gateway.port';
import { ReadyPlayerCmd } from './dtos/ready.player.cmd';
import {
    SOCKET_EVENTS, ERROR_CODES, BattleAbortedPayload,
} from '@funcode/shared';
import type { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';
import { RoomId, UserId } from '../../../domain/types/players';
import { ArenaTaskProviderPort } from '../../ports/outbound/arena.task.provider.port';


export class BattleManagerUC implements BattleManagerPort {
    private readyPlayers = new Map<RoomId, Set<UserId>>();

    constructor(
        private readonly playerGateway: PlayerGatewayPort,
        private readonly battleRepo: BattleRepositoryPort,
        private readonly arenaTaskProvider: ArenaTaskProviderPort
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

        const msg = { match: `${p1.username} vs ${p2.username}` };
        this.playerGateway.notifyRoom(roomId, SOCKET_EVENTS.MATCH_FOUND, msg);

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

        const task =
            this.arenaTaskProvider.getRandomTaskDto(
                battle.gameModeId
            );


        this.playerGateway.notifyRoom(
            roomId,
            SOCKET_EVENTS.BATTLE_STARTED,
            { task },
        );
    }

}
