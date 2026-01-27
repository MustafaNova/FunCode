import { JoinMatchMakingPort } from '../../ports/inbound/join-matchmaking.port';
import type { MatchmakingQueuePort } from '../../ports/outbound/matchmaking-queue.port';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user';
import { REDIS_MATCHMAKING_ADAPTER } from '../../tokens';
import { JoinCmd } from './dtos/join.cmd';
import { JoinRes } from './dtos/join.res';

@Injectable()
export class JoinMatchmakingService implements JoinMatchMakingPort {
    constructor(
        @Inject(REDIS_MATCHMAKING_ADAPTER)
        private readonly matchmakingQueuePort: MatchmakingQueuePort,
    ) {}

    async join(joinCmd: JoinCmd): Promise<JoinRes> {
        const user = new User(joinCmd.userId);
        await this.matchmakingQueuePort.enqueue(user);
        return JoinRes.ok();
    }
}
