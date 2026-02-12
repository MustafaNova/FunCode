import { BattleNotification } from '../../../domain/battle.notifs';

export interface PlayerNotifierPort {
    joinPlayersToRoom1v1(
        roomId: string,
        userId1: string,
        userId2: string,
    ): void;
    notifyBattleRoom(
        roomId: string,
        notif: BattleNotification,
        msg: string,
    ): void;
}
