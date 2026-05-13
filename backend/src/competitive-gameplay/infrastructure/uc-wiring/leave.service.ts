import { LeaveUC } from '../../application/use-cases/matchmaking-leave/leave.uc';
import { Inject, Injectable } from '@nestjs/common';
import { MATCHMAKING_QUEUE_PORT } from '../redis/tokens';
import type { MatchmakingQueuePort } from '../../application/ports/outbound/matchmaking-queue.port';


@Injectable()
export class LeaveService extends LeaveUC {
    constructor(
        @Inject(MATCHMAKING_QUEUE_PORT)
        matchmakingQueuePort: MatchmakingQueuePort,
    ) {
        super(matchmakingQueuePort);
    }
}
