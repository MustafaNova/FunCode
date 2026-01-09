import { Module } from '@nestjs/common';
import {JoinMatchmakingService} from "./application/use-cases/join-matchmaking.service";
import {RedisMatchmakingQueueAdapter} from "./infrastructure/redis-matchmaking-queue.adapter";
import {REDIS_MATCHMAKING_ADAPTER} from "./application/tokens";

@Module({
    imports: [],
    controllers: [],
    providers: [
        JoinMatchmakingService,
        {
            provide: REDIS_MATCHMAKING_ADAPTER,
            useClass: RedisMatchmakingQueueAdapter
        }
    ],
})
export class CompetitiveGameplayModule {}
