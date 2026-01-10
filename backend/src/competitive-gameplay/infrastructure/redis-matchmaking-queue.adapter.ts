import { MatchmakingQueuePort } from '../application/ports/outbound/matchmaking-queue.port';
import { User } from '../domain/entities/user';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../application/tokens';
import { Inject } from '@nestjs/common';

export class RedisMatchmakingQueueAdapter implements MatchmakingQueuePort {
    constructor(
        @Inject(REDIS_CLIENT)
        private readonly redis: Redis,
    ) {}

    async enqueue(user: User): Promise<void> {
        const key = 'queue:matchmaking:ranked';
        const time = Date.now();
        await this.redis.zadd(key, time, user.id);
    }
}
