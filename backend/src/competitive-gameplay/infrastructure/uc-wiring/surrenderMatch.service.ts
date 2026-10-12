import { SurrenderMatchUC } from '../../application/use-cases/surrenderMatch/surrenderMatch.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type BattleRepositoryPort } from '../../application/ports/outbound/battleRepository.port';
import { type PlayerGatewayPort } from '../../application/ports/outbound/player.gateway.port';
import { type MatchCleanupPort } from '../../application/ports/outbound/match.cleanup.port';
import { BATTLE_REPOSITORY_PORT } from '../database/tokens';
import { PLAYER_GATEWAY_PORT } from '../playerGateway/token';
import { MATCH_CLEANUP_PORT } from '../matchCleanup/token';

@Injectable()
export class SurrenderMatchService extends SurrenderMatchUC {
    constructor(
        @Inject(BATTLE_REPOSITORY_PORT)
        battleRepo: BattleRepositoryPort,
        @Inject(PLAYER_GATEWAY_PORT)
        playerGateway: PlayerGatewayPort,
        @Inject(MATCH_CLEANUP_PORT)
        matchCleanup: MatchCleanupPort
    ) {
        super(battleRepo, playerGateway, matchCleanup);
    }
}
