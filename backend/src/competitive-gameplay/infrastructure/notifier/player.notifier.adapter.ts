import { Injectable } from '@nestjs/common';
import { PlayerNotifierPort } from '../../application/ports/outbound/player.notifier.port';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BattleEvent } from '../../domain/battle.events';
import { ErrorCodes } from '../../../common/error.codes';

@Injectable()
export class PlayerNotifierAdapter implements PlayerNotifierPort {
    constructor(private readonly eventEmitter: EventEmitter2) {}

    async joinPlayersToRoom1v1(
        roomId: string,
        userId1: string,
        userId2: string,
    ): Promise<void> {
        await this.eventEmitter.emitAsync(BattleEvent.CREATE_1V1, {
            roomId,
            userId1,
            userId2,
        });
    }

    notifyBattleRoom(roomId: string, event: string, msg: unknown): void {
        this.eventEmitter.emit(BattleEvent.ROOM_NOTIFICATION, {
            roomId,
            event,
            msg,
        });
    }

    reportErrorToUser(userId: string, code: ErrorCodes, msg: string) {
        this.eventEmitter.emit(BattleEvent.ERROR, {
            userId,
            code,
            msg,
        });
    }
}
