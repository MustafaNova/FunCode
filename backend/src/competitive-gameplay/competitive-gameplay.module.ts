import { Module } from '@nestjs/common';
import { JoinMatchmakingService } from './application/use-cases/matchmaking-join/join-matchmaking.service';
import { RedisMatchmakingQueueAdapter } from './infrastructure/redis-matchmaking-queue.adapter';
import {
    JOIN_MATCHMAKING_SERVICE,
    REDIS_CLIENT,
    REDIS_MATCHMAKING_ADAPTER,
} from './application/tokens';
import Redis from 'ioredis';
import { MatchmakingController } from './presentation/controllers/matchmaking/matchmaking.controller';
import { AuthInfrastructureModule } from '../auth/infrastructure/auth/auth.infrastructure.module';

@Module({
    imports: [AuthInfrastructureModule],
    controllers: [MatchmakingController],
    providers: [
        {
            provide: JOIN_MATCHMAKING_SERVICE,
            useClass: JoinMatchmakingService,
        },
        {
            provide: REDIS_MATCHMAKING_ADAPTER,
            useClass: RedisMatchmakingQueueAdapter,
        },
        {
            provide: REDIS_CLIENT,
            useFactory: () => {
                return new Redis({
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT),
                });
            },
        },
    ],
})
export class CompetitiveGameplayModule {}
