import { MatchCleanupPort } from '../../application/ports/outbound/match.cleanup.port';
import { Inject, Injectable } from '@nestjs/common';
import { type ClassicMatchStatePort } from '../../application/ports/outbound/matchStates/classic.match.state.port';
import { type BugHunterMatchStatePort } from '../../application/ports/outbound/matchStates/bugHunter.match.state.port';
import { type CodeGolfMatchStatePort } from '../../application/ports/outbound/matchStates/codeGolf.match.state.port';
import { type PlayerGatewayPort } from '../../application/ports/outbound/player.gateway.port';
import { ArenaGameModeId } from '@funcode/shared';
import { CLASSIC_MATCH_STATE_PORT } from '../matchStates/ClassicMatchState/token';
import { BUG_HUNTER_MATCH_STATE_PORT } from '../matchStates/BugHunterMatchState/token';
import { CODE_GOLF_MATCH_STATE_PORT } from '../matchStates/CodeGolfMatchState/token';
import { PLAYER_GATEWAY_PORT } from '../playerGateway/token';


@Injectable()
export class MatchCleanupAdapter implements MatchCleanupPort {
    constructor(
        @Inject(CLASSIC_MATCH_STATE_PORT)
        private readonly classicMatchState: ClassicMatchStatePort,
        @Inject(BUG_HUNTER_MATCH_STATE_PORT)
        private readonly bugHunterMatchState: BugHunterMatchStatePort,
        @Inject(CODE_GOLF_MATCH_STATE_PORT)
        private readonly codeGolfMatchState: CodeGolfMatchStatePort,
        @Inject(PLAYER_GATEWAY_PORT)
        private readonly playerGateway: PlayerGatewayPort,
    ) {}

    async cleanup(roomId: string, gameModeId: ArenaGameModeId): Promise<void> {
        switch (gameModeId) {
            case 'classic-unranked-1v1':
                this.classicMatchState.delete(roomId);
                break;

            case 'bug-hunter-unranked-1v1':
                this.bugHunterMatchState.delete(roomId);
                break;

            case 'code-golf-unranked-1v1':
                this.codeGolfMatchState.delete(roomId);
                break;
        }

        await this.playerGateway.closeRoom(roomId);
    }
}
