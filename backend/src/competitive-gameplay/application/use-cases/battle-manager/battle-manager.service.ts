import { Injectable } from '@nestjs/common';
import { BattleManagerPort } from '../../ports/inbound/battle.manager.port';
import { Battle1vs1 } from '../../../domain/entities/battle1vs1';

@Injectable()
export class BattleManagerService implements BattleManagerPort {
    on1v1Created(battle: Battle1vs1): Promise<void> {
        console.log(
            battle.player1.username +
                ' ' +
                battle.player1.userId +
                ' ' +
                battle.player2.userId +
                ' ' +
                battle.player2.username,
        );
        return Promise.resolve();
    }
}
