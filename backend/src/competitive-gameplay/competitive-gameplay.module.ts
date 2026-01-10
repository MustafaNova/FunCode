import { Module } from '@nestjs/common';
import { JoinMatchmakingService } from './application/use-cases/join-matchmaking.service';
import { RedisMatchmakingQueueAdapter } from './infrastructure/redis-matchmaking-queue.adapter';
import { REDIS_CLIENT, REDIS_MATCHMAKING_ADAPTER } from './application/tokens';
import Redis from 'ioredis';

@Module({
    imports: [],
    controllers: [],
    providers: [
        JoinMatchmakingService,
        {
            provide: REDIS_MATCHMAKING_ADAPTER,
            useClass: RedisMatchmakingQueueAdapter,
        },
        {
            provide: REDIS_CLIENT,
            useFactory: () => {
                return new Redis({
                    host: 'localhost',
                    port: 6379,
                });
            },
        },
    ],
})
export class CompetitiveGameplayModule {}
