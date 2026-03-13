import { MatchMakerUC } from '../../application/use-cases/matchMaker/match-maker.uc';
import {
    Inject,
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';
import type { BattleRepositoryPort } from '../../application/ports/outbound/battleRepository.port';
import type { MatchmakingQueuePort } from '../../application/ports/outbound/matchmaking-queue.port';
import type { MatchPort } from '../../application/ports/outbound/match.port';
import type { IdGeneratorPort } from '../../application/ports/outbound/id.generator.port';
import { MATCHMAKING_QUEUE_PORT } from '../redis/tokens';
import { BATTLE_REPOSITORY_PORT } from '../database/tokens';
import { MATCH_PORT } from '../match/tokens';
import { ID_GENERATOR_PORT } from '../idGenerator/tokens';

@Injectable()
export class MatchMakerService
    extends MatchMakerUC
    implements OnModuleInit, OnModuleDestroy
{
    private stopped = false;
    constructor(
        @Inject(BATTLE_REPOSITORY_PORT)
        battleRepo: BattleRepositoryPort,
        @Inject(MATCHMAKING_QUEUE_PORT)
        matchMaking: MatchmakingQueuePort,
        @Inject(MATCH_PORT)
        match: MatchPort,
        @Inject(ID_GENERATOR_PORT)
        idGenerator: IdGeneratorPort,
    ) {
        super(battleRepo, matchMaking, match, idGenerator);
    }
    onModuleInit(): any {
        void this.loop();
    }

    onModuleDestroy(): any {
        this.stopped = true;
    }

    private async loop() {
        while (!this.stopped) {
            try {
                await this.match1v1Unranked();
            } catch (err) {
                console.log(err);
            }
            await this.sleep(1000);
        }
    }

    private sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
