import { Module } from '@nestjs/common';
import { JoinMatchmakingService } from './application/use-cases/matchmaking-join/join-matchmaking.service';
import { RedisMatchmakingQueueAdapter } from './infrastructure/redis/redis-matchmaking-queue.adapter';
import {
    JOIN_MATCHMAKING_SERVICE,
    MATCHMAKING_QUEUE_PORT,
    REDIS_CLIENT,
} from './application/tokens';
import Redis from 'ioredis';
import { MatchmakingController } from './presentation/http/controllers/matchmaking/matchmaking.controller';
import { AuthInfrastructureModule } from '../auth/infrastructure/auth/auth.infrastructure.module';
import { MatchMakerService } from './application/use-cases/matchMaker/match-maker.service';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
    imports: [AuthInfrastructureModule, DatabaseModule],
    controllers: [MatchmakingController],
    providers: [
        {
            provide: JOIN_MATCHMAKING_SERVICE,
            useClass: JoinMatchmakingService,
        },
        {
            provide: MATCHMAKING_QUEUE_PORT,
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
        MatchMakerService,
    ],
})
export class CompetitiveGameplayModule {}
