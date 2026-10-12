import { MatchMakerUC } from '../../application/use-cases/matchMaker/match-maker.uc';
import {
    Inject,
    Injectable,
} from '@nestjs/common';
import type { BattleRepositoryPort } from '../../application/ports/outbound/battleRepository.port';
import type { MatchmakingQueuePort } from '../../application/ports/outbound/matchmaking-queue.port';
import type { IdGeneratorPort } from '../../application/ports/outbound/id.generator.port';
import { MATCHMAKING_QUEUE_PORT } from '../redis/tokens';
import { BATTLE_REPOSITORY_PORT } from '../database/tokens';
import { ID_GENERATOR_PORT } from '../idGenerator/tokens';
import { BATTLE_MANAGER_PORT } from './tokens';
import { type BattleManagerPort } from '../../application/ports/inbound/battle.manager.port';

@Injectable()
export class MatchMakerService extends MatchMakerUC {
    constructor(
        @Inject(BATTLE_REPOSITORY_PORT)
        battleRepo: BattleRepositoryPort,
        @Inject(MATCHMAKING_QUEUE_PORT)
        matchMaking: MatchmakingQueuePort,
        @Inject(ID_GENERATOR_PORT)
        idGenerator: IdGeneratorPort,
        @Inject(BATTLE_MANAGER_PORT)
        battleManager: BattleManagerPort
    ) {
        super(battleRepo, matchMaking, idGenerator, battleManager);
    }
}
