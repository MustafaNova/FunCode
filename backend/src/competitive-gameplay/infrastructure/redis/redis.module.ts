import { forwardRef, Module } from '@nestjs/common';
import { RedisMatchmakingQueueAdapter } from './redis-matchmaking-queue.adapter';
import { BattleEventPublisherAdapter } from './battle.event.publisher.adapter';
import Redis from 'ioredis';
import {
    BATTLE_EVENT_PUBLISHER_PORT,
    MATCHMAKING_QUEUE_PORT,
    REDIS_CLIENT,
    REDIS_SUBSCRIBER_CLIENT,
} from './tokens';
import { BattleEventSubscriberAdapter } from './battle.event.subscriber.adapter';
import { ApplicationModule } from '../../application/application.module';

@Module({
    imports: [forwardRef(() => ApplicationModule)],
    providers: [
        BattleEventSubscriberAdapter,
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
