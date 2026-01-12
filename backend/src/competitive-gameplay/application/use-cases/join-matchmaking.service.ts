import { JoinMatchMakingPort } from '../ports/inbound/join-matchmaking.port';
import type { MatchmakingQueuePort } from '../ports/outbound/matchmaking-queue.port';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';
import { REDIS_MATCHMAKING_ADAPTER } from '../tokens';

@Injectable()
export class JoinMatchmakingService implements JoinMatchMakingPort {
    constructor(
        @Inject(REDIS_MATCHMAKING_ADAPTER)
        private readonly matchmakingQueuePort: MatchmakingQueuePort,
    ) {}

    join(userId: string): Promise<void> {
        const user = new User(userId);
        return this.matchmakingQueuePort.enqueue(user);
    }
}
