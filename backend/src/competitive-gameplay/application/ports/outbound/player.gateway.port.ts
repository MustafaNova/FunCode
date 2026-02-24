import { BattleNotification } from '../../../domain/battle.notifs';
import { ErrorCodes } from '../../../../common/error.codes';

export interface PlayerGatewayPort {
    joinPlayersToRoom1v1(
        roomId: string,
        userId1: string,
        userId2: string,
    ): Promise<void>;
    closeRoom(roomId: string): Promise<void>;
    notifyRoom(roomId: string, notif: BattleNotification, msg: unknown): void;
    reportError(userId: string, code: ErrorCodes, msg: string): void;
}
