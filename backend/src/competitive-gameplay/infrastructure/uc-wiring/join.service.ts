import { JoinUC } from '../../application/use-cases/matchmaking-join/join.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { MatchmakingQueuePort } from '../../application/ports/outbound/matchmaking-queue.port';
import { MATCHMAKING_QUEUE_PORT } from '../redis/tokens';

@Injectable()
export class JoinService extends JoinUC {
    constructor(
        @Inject(MATCHMAKING_QUEUE_PORT)
        matchmakingQueuePort: MatchmakingQueuePort,
    ) {
        super(matchmakingQueuePort);
    }
}
