import { Injectable } from '@nestjs/common';
import { PlayerGatewayPort } from '../../application/ports/outbound/player.gateway.port';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BattleEvent } from '../../domain/enums/battle.events';
import { LoseRes, WinRes } from '@funcode/shared';

@Injectable()
export class PlayerGatewayAdapter implements PlayerGatewayPort {
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

    async closeRoom(roomId: string) {
        await this.eventEmitter.emitAsync(BattleEvent.CLOSE_ROOM, { roomId });
    }

    notifyRoom(roomId: string, event: string, msg: unknown): void {
        this.eventEmitter.emit(BattleEvent.ROOM_NOTIFICATION, {
            roomId,
            event,
            msg,
        });
    }

    notifyPlayerWin(userId: string, payload: WinRes) {
        this.eventEmitter.emit(BattleEvent.WIN_NOTIFICATION, {
            userId,
            payload,
        });
    }

    notifyPlayerLose(userId: string, payload: LoseRes) {
        this.eventEmitter.emit(BattleEvent.LOSE_NOTIFICATION, {
            userId,
            payload,
        });
    }

}
