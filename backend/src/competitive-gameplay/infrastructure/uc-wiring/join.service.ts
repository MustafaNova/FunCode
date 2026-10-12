import { JoinUC } from '../../application/use-cases/matchmaking-join/join.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { MatchmakingQueuePort } from '../../application/ports/outbound/matchmaking-queue.port';
import { MATCHMAKING_QUEUE_PORT } from '../redis/tokens';
import { type MatchMakerPort } from '../../application/ports/inbound/match-maker.port';
import { MATCH_MAKER_PORT } from './tokens';

@Injectable()
export class JoinService extends JoinUC {
    constructor(
        @Inject(MATCHMAKING_QUEUE_PORT)
        matchmakingQueuePort: MatchmakingQueuePort,
        @Inject(MATCH_MAKER_PORT)
        matchMaker: MatchMakerPort,
    ) {
        super(matchmakingQueuePort, matchMaker);
    }
}
