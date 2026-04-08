import { BattleNotification } from '../../../domain/enums/battle.notification';
import { ErrorCodes } from '../../../../common/error.codes';
import { LosePayload, WinPayload } from '../../../domain/value-objects/payloads';

export interface PlayerGatewayPort {
    joinPlayersToRoom1v1(
        roomId: string,
        userId1: string,
        userId2: string,
    ): Promise<void>;
    closeRoom(roomId: string): Promise<void>;
    notifyRoom(roomId: string, notif: BattleNotification, msg: unknown): void;
    notifyPlayerWin(userId: string, payload: WinPayload): void;
    notifyPlayerLose(userId: string, payload: LosePayload): void;
    reportError(userId: string, code: ErrorCodes, msg: string): void;
}
