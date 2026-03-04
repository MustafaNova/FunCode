import { BattleManagerUC } from '../../application/use-cases/battle-manager/battle-manager.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { PlayerGatewayPort } from '../../application/ports/outbound/player.gateway.port';
import type { ChallengeRepositoryPort } from '../../application/ports/outbound/challenge.repository.port';
import type { ValidatorPort } from '../../application/ports/inbound/validator.port';
import type { BattleRepositoryPort } from '../../application/ports/outbound/battleRepository.port';
import { PLAYER_GATEWAY_PORT } from '../playerGateway/token';
import {
    BATTLE_REPOSITORY_PORT,
    CHALLENGE_REPOSITORY_PORT,
    VALIDATOR_PORT,
} from './tokens';

@Injectable()
export class BattleManagerService extends BattleManagerUC {
    constructor(
        @Inject(PLAYER_GATEWAY_PORT)
        playerGateway: PlayerGatewayPort,
        @Inject(CHALLENGE_REPOSITORY_PORT)
        challengeRepo: ChallengeRepositoryPort,
        @Inject(VALIDATOR_PORT)
        validator: ValidatorPort,
        @Inject(BATTLE_REPOSITORY_PORT)
        battleRepo: BattleRepositoryPort,
    ) {
        super(playerGateway, challengeRepo, validator, battleRepo);
    }
}
