import { BattleManagerUC } from '../../application/use-cases/battle-manager/battle-manager.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { PlayerGatewayPort } from '../../application/ports/outbound/player.gateway.port';
import type { BattleRepositoryPort } from '../../application/ports/outbound/battleRepository.port';
import { PLAYER_GATEWAY_PORT } from '../playerGateway/token';
import {
    ARENA_TASK_PROVIDER_PORT,
    BATTLE_REPOSITORY_PORT,
} from '../database/tokens';
import { type ArenaTaskProviderPort } from '../../application/ports/outbound/arena.task.provider.port';
import { CODE_GOLF_MATCH_STATE_PORT } from '../matchStates/CodeGolfMatchState/token';
import { type CodeGolfMatchStatePort } from '../../application/ports/outbound/matchStates/codeGolf.match.state.port';
import { type BugHunterMatchStatePort } from '../../application/ports/outbound/matchStates/bugHunter.match.state.port';
import { type ClassicMatchStatePort } from '../../application/ports/outbound/matchStates/classic.match.state.port';
import { BUG_HUNTER_MATCH_STATE_PORT } from '../matchStates/BugHunterMatchState/token';
import { CLASSIC_MATCH_STATE_PORT } from '../matchStates/ClassicMatchState/token';

@Injectable()
export class BattleManagerService extends BattleManagerUC {
    constructor(
        @Inject(PLAYER_GATEWAY_PORT)
        playerGateway: PlayerGatewayPort,
        @Inject(BATTLE_REPOSITORY_PORT)
        battleRepo: BattleRepositoryPort,
        @Inject(ARENA_TASK_PROVIDER_PORT)
        arenaTaskProvider: ArenaTaskProviderPort,
        @Inject(CODE_GOLF_MATCH_STATE_PORT)
        codeGolfMatchState: CodeGolfMatchStatePort,
        @Inject(BUG_HUNTER_MATCH_STATE_PORT)
        bugHunterMatchState: BugHunterMatchStatePort,
        @Inject(CLASSIC_MATCH_STATE_PORT)
        classicMatchState: ClassicMatchStatePort
    ) {
        super(
            playerGateway,
            battleRepo,
            arenaTaskProvider,
            codeGolfMatchState,
            bugHunterMatchState,
            classicMatchState
        );
    }
}
