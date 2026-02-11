import { Injectable } from '@nestjs/common';
import { PlayerNotifierPort } from '../../application/ports/outbound/player.notifier.port';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PlayerNotifierAdapter implements PlayerNotifierPort {
    constructor(private readonly eventEmitter: EventEmitter2) {}

    joinPlayersToRoom1v1(
        roomId: string,
        userId1: string,
        userId2: string,
    ): void {
        this.eventEmitter.emit('createNewRoom1v1', {
            roomId,
            userId1,
            userId2,
        });
    }

    notifyBattleRoom(roomId: string, event: string, msg: string): void {
        this.eventEmitter.emit('notifyRoom', { roomId, event, msg });
    }
}
