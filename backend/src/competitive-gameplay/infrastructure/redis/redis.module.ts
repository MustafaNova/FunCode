import { Module } from '@nestjs/common';
import { RedisMatchmakingQueueAdapter } from './redis-matchmaking-queue.adapter';
import Redis from 'ioredis';
import { MATCHMAKING_QUEUE_PORT, REDIS_CLIENT } from './tokens';

@Module({
    providers: [
        {
            provide: MATCHMAKING_QUEUE_PORT,
            useClass: RedisMatchmakingQueueAdapter,
        },
        {
            provide: REDIS_CLIENT,
            useFactory: () => {
                return new Redis(process.env['REDIS_URL']!);
            },
        },
    ],
    exports: [MATCHMAKING_QUEUE_PORT],
})
export class RedisModule {}
