import { Inject, Injectable } from '@nestjs/common';
import { BATTLE_MANAGER_PORT } from '../tokens';
import type { BattleManagerPort } from '../../../application/ports/inbound/battle.manager.port';
import { MatchEvent } from '../../../domain/enums/match.events';
import { OnEvent } from '@nestjs/event-emitter';
import { Battle1vs1 } from '../../../domain/entities/battle1vs1';

@Injectable()
export class MatchFound1v1Listener {
    constructor(
        @Inject(BATTLE_MANAGER_PORT)
        private readonly battleManager: BattleManagerPort,
    ) {}

    @OnEvent(MatchEvent.MATCH_FOUND_1V1)
    handle(battle: Battle1vs1) {
        void this.battleManager.on1v1Created(battle);
    }
}
