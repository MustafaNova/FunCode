import { SubmitArenaSolutionUC } from '../../application/use-cases/submitArenaSolution/submitArenaSolution.uc';
import { Inject, Injectable } from '@nestjs/common';
import { PLAYER_GATEWAY_PORT } from '../playerGateway/token';
import type { PlayerGatewayPort } from '../../application/ports/outbound/player.gateway.port';
import { BUG_HUNTER_VALIDATOR_PORT, CLASSIC_VALIDATOR_PORT } from './tokens';
import type { ClassicValidatorPort } from '../../application/ports/inbound/classicValidator.port';
import { BATTLE_REPOSITORY_PORT } from '../database/tokens';
import type { BattleRepositoryPort } from '../../application/ports/outbound/battleRepository.port';
import { type BugHunterValidatorPort } from '../../application/ports/inbound/bugHunterValidator.port';

@Injectable()
export class SubmitArenaSolutionService extends SubmitArenaSolutionUC {
    constructor(
        @Inject(PLAYER_GATEWAY_PORT)
        playerGateway: PlayerGatewayPort,
        @Inject(CLASSIC_VALIDATOR_PORT)
        classicValidator: ClassicValidatorPort,
        @Inject(BUG_HUNTER_VALIDATOR_PORT)
        bugHunterValidator: BugHunterValidatorPort,
        @Inject(BATTLE_REPOSITORY_PORT)
        battleRepo: BattleRepositoryPort,
    ) {
        super(playerGateway, classicValidator, bugHunterValidator, battleRepo);
    }
}
