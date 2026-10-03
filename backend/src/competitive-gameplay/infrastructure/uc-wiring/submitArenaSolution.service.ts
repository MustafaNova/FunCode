import { SubmitArenaSolutionUC } from '../../application/use-cases/submitArenaSolution/submitArenaSolution.uc';
import { Inject, Injectable } from '@nestjs/common';
import { PLAYER_GATEWAY_PORT } from '../playerGateway/token';
import type { PlayerGatewayPort } from '../../application/ports/outbound/player.gateway.port';
import { BUG_HUNTER_VALIDATOR_PORT, CLASSIC_VALIDATOR_PORT, CODE_GOLF_VALIDATOR_PORT } from './tokens';
import type { ClassicValidatorPort } from '../../application/ports/inbound/validators/classicValidator.port';
import { BATTLE_REPOSITORY_PORT } from '../database/tokens';
import type { BattleRepositoryPort } from '../../application/ports/outbound/battleRepository.port';
import { type BugHunterValidatorPort } from '../../application/ports/inbound/validators/bugHunterValidator.port';
import { type CodeGolfValidatorPort } from '../../application/ports/inbound/validators/codeGolfValidator.port';
import { CODE_GOLF_MATCH_STATE_PORT } from '../matchStates/CodeGolfMatchState/token';
import { type CodeGolfMatchStatePort } from '../../application/ports/outbound/matchStates/codeGolf.match.state.port';
import { type BugHunterMatchStatePort } from '../../application/ports/outbound/matchStates/bugHunter.match.state.port';
import { type ClassicMatchStatePort } from '../../application/ports/outbound/matchStates/classic.match.state.port';
import { BUG_HUNTER_MATCH_STATE_PORT } from '../matchStates/BugHunterMatchState/token';
import { CLASSIC_MATCH_STATE_PORT } from '../matchStates/ClassicMatchState/token';

@Injectable()
export class SubmitArenaSolutionService extends SubmitArenaSolutionUC {
    constructor(
        @Inject(PLAYER_GATEWAY_PORT)
        playerGateway: PlayerGatewayPort,
        @Inject(CLASSIC_VALIDATOR_PORT)
        classicValidator: ClassicValidatorPort,
        @Inject(BUG_HUNTER_VALIDATOR_PORT)
        bugHunterValidator: BugHunterValidatorPort,
        @Inject(CODE_GOLF_VALIDATOR_PORT)
        codeGolfValidator: CodeGolfValidatorPort,
        @Inject(BATTLE_REPOSITORY_PORT)
        battleRepo: BattleRepositoryPort,
        @Inject(CODE_GOLF_MATCH_STATE_PORT)
        codeGolfMatchState: CodeGolfMatchStatePort,
        @Inject(BUG_HUNTER_MATCH_STATE_PORT)
        bugHunterMatchState: BugHunterMatchStatePort,
        @Inject(CLASSIC_MATCH_STATE_PORT)
        classicMatchState: ClassicMatchStatePort,
    ) {
        super(
            playerGateway,
            classicValidator,
            bugHunterValidator,
            codeGolfValidator,
            battleRepo,
            codeGolfMatchState,
            bugHunterMatchState,
            classicMatchState
        );
    }
}
