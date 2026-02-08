import { Injectable } from '@nestjs/common';
import { PlayerNotifierPort } from '../../application/ports/outbound/player.notifier.port';
import { Battle1vs1 } from '../../domain/entities/battle1vs1';
import { GameGateway } from '../../presentation/websocket/game.gateway';
import { randomUUID } from 'node:crypto';

@Injectable()
export class PlayerNotifierAdapter implements PlayerNotifierPort {
    constructor(private readonly gameGateway: GameGateway) {}

    async createBattleRoom1v1(battle: Battle1vs1): Promise<void> {
        const roomId = randomUUID();
        await this.gameGateway.createNewRoom1v1(
            roomId,
            battle.player1.userId,
            battle.player2.userId,
        );
    }

    notifyBattleRoom(roomId: string, msg: string): Promise<void> {
    }
}
