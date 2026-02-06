import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { BATTLE_MANAGER_PORT, REDIS_CLIENT } from '../../application/tokens';
import type { BattleManagerPort } from '../../application/ports/inbound/battle.manager.port';
import { Battle1vs1, PlayerInfo } from '../../domain/entities/battle1vs1';

interface Payload {
    player1: PlayerInfo;
    player2: PlayerInfo;
}

@Injectable()
export class BattleEventSubscriberAdapter implements OnModuleInit {
    constructor(
        @Inject(REDIS_CLIENT)
        private readonly redis: Redis,
        @Inject(BATTLE_MANAGER_PORT)
        private readonly battleManager: BattleManagerPort,
    ) {}

    async onModuleInit(): Promise<void> {
        console.log('subscriber init');
        await this.redis.subscribe('battle.created', (msg) => {
            console.log('subscriber no string');
            if (typeof msg !== 'string') return;
            console.log('subscriber is string');
            const payload = JSON.parse(msg) as Payload;
            const battle = Battle1vs1.create(payload.player1, payload.player2);
            void this.battleManager.on1v1Created(battle);
            console.log('on1v1Created aufgerufen');
        });
    }
}
