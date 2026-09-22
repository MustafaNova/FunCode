import { BattleManagerUC } from '../../application/use-cases/battle-manager/battle-manager.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { PlayerGatewayPort } from '../../application/ports/outbound/player.gateway.port';
import type { ValidatorPort } from '../../application/ports/inbound/validator.port';
import type { BattleRepositoryPort } from '../../application/ports/outbound/battleRepository.port';
import { PLAYER_GATEWAY_PORT } from '../playerGateway/token';
import { VALIDATOR_PORT } from './tokens';
import {
    ARENA_TASK_PROVIDER_PORT,
    BATTLE_REPOSITORY_PORT,
} from '../database/tokens';
import { type ArenaTaskProviderPort } from '../../application/ports/outbound/arena.task.provider.port';

@Injectable()
export class BattleManagerService extends BattleManagerUC {
    constructor(
        @Inject(PLAYER_GATEWAY_PORT)
        playerGateway: PlayerGatewayPort,
        @Inject(BATTLE_REPOSITORY_PORT)
        battleRepo: BattleRepositoryPort,
        @Inject(ARENA_TASK_PROVIDER_PORT)
        arenaTaskProvider: ArenaTaskProviderPort
    ) {
        super(playerGateway, battleRepo, arenaTaskProvider);
    }
}
