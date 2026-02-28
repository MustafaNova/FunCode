import { MatchMakerPort } from '../../ports/inbound/match-maker.port';
import type { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';
import type { MatchmakingQueuePort } from '../../ports/outbound/matchmaking-queue.port';
import { Battle1vs1 } from '../../../domain/entities/battle1vs1';
import type { BattleEventPublisherPort } from '../../ports/outbound/battle.event.publisher.port';
import type { IdGeneratorPort } from '../../ports/outbound/id.generator.port';
import { MatchType } from '../../../domain/enums/matchtype';
import { PlayerCount } from '../../../domain/enums/playercount';

export class MatchMakerUC implements MatchMakerPort {
    constructor(
        private readonly battleRepo: BattleRepositoryPort,
        private readonly matchMaking: MatchmakingQueuePort,
        private readonly battleEventPublisher: BattleEventPublisherPort,
        private readonly idGenerator: IdGeneratorPort,
    ) {}

    async match1v1Unranked() {
        const type = MatchType.UNRANKED;
        const playerNum = PlayerCount.ONE;
        const playerCount = await this.matchMaking.getEntryCount(
            type,
            playerNum,
        );
        console.log('entryCount:', playerCount);
        if (playerCount < 2) return;
        const twoPlayers = await this.matchMaking.popTwoPlayers(
            type,
            playerNum,
        );
        const p1 = twoPlayers[0];
        const p2 = twoPlayers[1];
        console.log(`popped ${p1.username} and ${p2.username}`);

        const roomId = this.idGenerator.generate();
        const battle = Battle1vs1.create(
            { userId: p1.userId, username: p1.username },
            { userId: p2.userId, username: p2.username },
            roomId,
        );

        await this.battleRepo.save1vs1(battle);
        await this.battleEventPublisher.created1v1(battle);
    }
}
