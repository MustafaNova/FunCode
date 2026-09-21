import { MatchMakerPort } from '../../ports/inbound/match-maker.port';
import type { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';
import type { MatchmakingQueuePort } from '../../ports/outbound/matchmaking-queue.port';
import { Battle1v1 } from '../../../domain/entities/battle1v1';
import type { IdGeneratorPort } from '../../ports/outbound/id.generator.port';
import { REQUIRED_PLAYERS } from '../../../domain/constants/arenaGameMode.constants';
import { ArenaGameModeId } from '@funcode/shared';
import { QueueEntry } from '../../../domain/entities/queueEntry';
import { BattleManagerPort } from '../../ports/inbound/battle.manager.port';

export class MatchMakerUC implements MatchMakerPort {
    constructor(
        private readonly battleRepo: BattleRepositoryPort,
        private readonly matchMaking: MatchmakingQueuePort,
        private readonly idGenerator: IdGeneratorPort,
        private readonly battleManager: BattleManagerPort
    ) {}

    async tryMatch(gameModeId: ArenaGameModeId) {
        const requiredPlayers = REQUIRED_PLAYERS[gameModeId];
        const players =
            await this.matchMaking.tryPopPlayers(gameModeId, requiredPlayers);

        if (!players) return;

        switch (gameModeId) {
            case 'classic-unranked-1v1':
                return this.create1v1(players, gameModeId);

            case 'bug-hunter-unranked-1v1':
                return this.create1v1(players, gameModeId);

            case 'code-golf-unranked-1v1':
                return this.create1v1(players, gameModeId);
        }
    }

    private async create1v1(players: QueueEntry[], gameModeId: ArenaGameModeId) {
        const [p1, p2] = players;

        const roomId = this.idGenerator.generate();
        const battle: Battle1v1 = {
            player1: { userId: p1.userId, username: p1.username },
            player2: { userId: p2.userId, username: p2.username },
            roomId,
            gameModeId
        }

        await this.battleRepo.save1v1(battle);
        await this.battleManager.on1v1Created(battle);
    }
}
