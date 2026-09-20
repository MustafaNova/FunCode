import { MatchMakerPort } from '../../ports/inbound/match-maker.port';
import type { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';
import type { MatchmakingQueuePort } from '../../ports/outbound/matchmaking-queue.port';
import { Battle1vs1 } from '../../../domain/entities/battle1vs1';
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
            case 'unranked-1v1':
                return this.create1v1(players);

            case 'bug-hunter-1v1':
                return this.create1v1(players);

            case 'code-golf-1v1':
                return this.create1v1(players);
        }
    }

    private async create1v1(players: QueueEntry[]) {
        const [p1, p2] = players;

        const roomId = this.idGenerator.generate();
        const battle = Battle1vs1.create(
            { userId: p1.userId, username: p1.username },
            { userId: p2.userId, username: p2.username },
            roomId,
        );

        await this.battleRepo.save1vs1(battle);
        await this.battleManager.on1v1Created(battle);
    }
}
