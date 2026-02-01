import { JoinMatchMakingPort } from '../../ports/inbound/join-matchmaking.port';
import type { MatchmakingQueuePort } from '../../ports/outbound/matchmaking-queue.port';
import { Inject, Injectable } from '@nestjs/common';
import { MATCHMAKING_QUEUE_PORT } from '../../tokens';
import { JoinCmd } from './dtos/join.cmd';
import { JoinRes } from './dtos/join.res';
import { QueueEntry } from '../../../domain/entities/queueEntry';

@Injectable()
export class JoinMatchmakingService implements JoinMatchMakingPort {
    constructor(
        @Inject(MATCHMAKING_QUEUE_PORT)
        private readonly matchmakingQueuePort: MatchmakingQueuePort,
    ) {}

    async join(joinCmd: JoinCmd): Promise<JoinRes> {
        const queueEntry = QueueEntry.create(joinCmd.userId, joinCmd.username);
        await this.matchmakingQueuePort.enqueue(queueEntry);
        return JoinRes.ok();
    }
}
