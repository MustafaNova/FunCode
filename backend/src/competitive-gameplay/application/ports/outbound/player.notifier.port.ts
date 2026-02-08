import { Battle1vs1 } from '../../../domain/entities/battle1vs1';

export interface PlayerNotifierPort {
    createBattleRoom1v1(battle: Battle1vs1): Promise<void>;
    notifyBattleRoom(roomId: string, msg: string): Promise<void>;
}
