import { MatchmakingQueuePort } from '../application/ports/outbound/matchmaking-queue.port';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../application/tokens';
import { Inject } from '@nestjs/common';
import { QueueEntry } from '../domain/entities/queueEntry';

export class RedisMatchmakingQueueAdapter implements MatchmakingQueuePort {
    constructor(
        @Inject(REDIS_CLIENT)
        private readonly redis: Redis,
    ) {}

    async enqueue(queueEntry: QueueEntry): Promise<void> {
        const key = 'queue:matchmaking:ranked';
        const time = Date.now();
        const value = JSON.stringify({
            userId: queueEntry.userId,
            username: queueEntry.username,
        });
        await this.redis.zadd(key, time, value);
    }
}
