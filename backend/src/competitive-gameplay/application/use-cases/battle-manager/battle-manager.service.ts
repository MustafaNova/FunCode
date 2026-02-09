import { Inject, Injectable } from '@nestjs/common';
import { BattleManagerPort } from '../../ports/inbound/battle.manager.port';
import { Battle1vs1, PlayerInfo } from '../../../domain/entities/battle1vs1';
import { randomUUID } from 'node:crypto';
import type { PlayerNotifierPort } from '../../ports/outbound/player.notifier.port';
import { PLAYER_NOTIFIER_PORT } from '../../../infrastructure/notifier/token';
import { BattleMsg } from './messages';

@Injectable()
export class BattleManagerService implements BattleManagerPort {
    roomToPlayers = new Map<string, PlayerInfo[]>();

    constructor(
        @Inject(PLAYER_NOTIFIER_PORT)
        private readonly playerNotifier: PlayerNotifierPort,
    ) {}

    async on1v1Created(battle: Battle1vs1): Promise<void> {
        const roomId = randomUUID();
        const p1 = battle.player1;
        const p2 = battle.player2;

        this.roomToPlayers.set(roomId, [p1, p2]);
        await this.playerNotifier.joinPlayersToRoom1v1(
            roomId,
            p1.userId,
            p2.userId,
        );
        this.playerNotifier.notifyBattleRoom(
            roomId,
            p1.username,
            p2.username,
            BattleMsg.MATCH_FOUND,
        );

        return Promise.resolve();
    }
}
