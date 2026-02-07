import { BattleEventPublisherPort } from '../../application/ports/outbound/battle.event.publisher.port';
import Redis from 'ioredis';
import { Inject } from '@nestjs/common';
import { Battle1vs1 } from '../../domain/entities/battle1vs1';
import { REDIS_CLIENT } from './tokens';

export class BattleEventPublisherAdapter implements BattleEventPublisherPort {
    constructor(
        @Inject(REDIS_CLIENT)
        private readonly redis: Redis,
    ) {}

    async created1v1(battle: Battle1vs1): Promise<void> {
        const msg = JSON.stringify(battle);
        await this.redis.publish('battle.created', msg);
        console.log('published battle.created');
    }
}
