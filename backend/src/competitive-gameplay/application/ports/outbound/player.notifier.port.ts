import { BattleNotification } from '../../../domain/battle.notifs';
import { ErrorCodes } from '../../../../common/error.codes';

export interface PlayerNotifierPort {
    joinPlayersToRoom1v1(
        roomId: string,
        userId1: string,
        userId2: string,
    ): Promise<void>;
    notifyBattleRoom(roomId: string, notif: BattleNotification, msg: any): void;
    reportErrorToUser(userId: string, code: ErrorCodes, msg: string): void;
}
