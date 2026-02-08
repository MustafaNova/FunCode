import { Injectable } from '@nestjs/common';
import { BattleManagerPort } from '../../ports/inbound/battle.manager.port';
import { Battle1vs1 } from '../../../domain/entities/battle1vs1';

@Injectable()
export class BattleManagerService implements BattleManagerPort {
    on1v1Created(battle: Battle1vs1): Promise<void> {
        return Promise.resolve();
    }
}
