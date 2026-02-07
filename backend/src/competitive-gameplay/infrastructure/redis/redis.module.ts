import { Module } from '@nestjs/common';
import { RedisMatchmakingQueueAdapter } from './redis-matchmaking-queue.adapter';
import { BattleEventPublisherAdapter } from './battle.event.publisher.adapter';
import Redis from 'ioredis';
import {
    BATTLE_EVENT_PUBLISHER_PORT,
    MATCHMAKING_QUEUE_PORT,
    REDIS_CLIENT,
    REDIS_SUBSCRIBER_CLIENT,
} from './tokens';
import { BATTLE_MANAGER_PORT } from '../../application/tokens';
import { BattleManagerService } from '../../application/use-cases/battle-manager/battle-manager.service';

@Module({
    providers: [
        {
            provide: BATTLE_MANAGER_PORT,
            useExisting: BattleManagerService,
        },
        {
            provide: MATCHMAKING_QUEUE_PORT,
            useClass: RedisMatchmakingQueueAdapter,
        },
        {
            provide: BATTLE_EVENT_PUBLISHER_PORT,
            useClass: BattleEventPublisherAdapter,
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
        {
            provide: REDIS_SUBSCRIBER_CLIENT,
            useFactory: () => {
                return new Redis({
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT),
                });
            },
        },
    ],
    exports: [MATCHMAKING_QUEUE_PORT, BATTLE_EVENT_PUBLISHER_PORT],
})
export class RedisModule {}
