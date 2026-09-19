import { MatchMakerPort } from '../../ports/inbound/match-maker.port';
import type { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';
import type { MatchmakingQueuePort } from '../../ports/outbound/matchmaking-queue.port';
import { Battle1vs1 } from '../../../domain/entities/battle1vs1';
import type { MatchPort } from '../../ports/outbound/match.port';
import type { IdGeneratorPort } from '../../ports/outbound/id.generator.port';
import { ArenaGameModeId } from '@funcode/shared';

export class MatchMakerUC implements MatchMakerPort {
    constructor(
        private readonly battleRepo: BattleRepositoryPort,
        private readonly matchMaking: MatchmakingQueuePort,
        private readonly match: MatchPort,
        private readonly idGenerator: IdGeneratorPort,
    ) {}

    async match1v1Unranked() {
        const players =
            await this.matchMaking.tryPopTwoPlayers('unranked-1v1');

        if (!players) return;

        const [p1, p2] = players;


        const roomId = this.idGenerator.generate();
        const battle = Battle1vs1.create(
            { userId: p1.userId, username: p1.username },
            { userId: p2.userId, username: p2.username },
            roomId,
        );

        await this.battleRepo.save1vs1(battle);
        this.match.matchFound1v1(battle);
    }
}
