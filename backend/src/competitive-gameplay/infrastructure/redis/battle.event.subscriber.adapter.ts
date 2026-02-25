import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { BATTLE_MANAGER_PORT } from '../../application/tokens';
import type { BattleManagerPort } from '../../application/ports/inbound/battle.manager.port';
import { Battle1vs1 } from '../../domain/entities/battle1vs1';
import { REDIS_SUBSCRIBER_CLIENT } from './tokens';

@Injectable()
export class BattleEventSubscriberAdapter implements OnModuleInit {
    constructor(
        @Inject(REDIS_SUBSCRIBER_CLIENT)
        private readonly redis: Redis,
        @Inject(BATTLE_MANAGER_PORT)
        private readonly battleManager: BattleManagerPort,
    ) {}

    async onModuleInit(): Promise<void> {
        await this.redis.subscribe('battle.created');
        this.redis.on('message', (channel, msg) => {
            const battle = JSON.parse(msg) as Battle1vs1;
            void this.battleManager.on1v1Created(battle);
        });
    }
}
