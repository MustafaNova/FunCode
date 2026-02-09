import { Injectable } from '@nestjs/common';
import { PlayerNotifierPort } from '../../application/ports/outbound/player.notifier.port';
import { GameGateway } from '../../presentation/websocket/game.gateway';

@Injectable()
export class PlayerNotifierAdapter implements PlayerNotifierPort {
    constructor(private readonly gameGateway: GameGateway) {}

    async joinPlayersToRoom1v1(
        roomId: string,
        userId1: string,
        userId2: string,
    ): Promise<void> {
        await this.gameGateway.createNewRoom1v1(roomId, userId1, userId2);
    }

    notifyBattleRoom(
        roomId: string,
        name1: string,
        name2: string,
        msg: string,
    ): void {
        this.gameGateway.notifyRoom1v1(roomId, name1, name2, msg);
    }
}
