import { Inject, Injectable } from '@nestjs/common';
import { BattleManagerPort } from '../../ports/inbound/battle.manager.port';
import { Battle1vs1, PlayerInfo } from '../../../domain/entities/battle1vs1';
import { randomUUID } from 'node:crypto';
import type { PlayerNotifierPort } from '../../ports/outbound/player.notifier.port';
import { PLAYER_NOTIFIER_PORT } from '../../../infrastructure/notifier/token';
import { BattleNotification } from '../../../domain/battle.notifs';

@Injectable()
export class BattleManagerService implements BattleManagerPort {
    roomToPlayers = new Map<string, PlayerInfo[]>();
    private readyPlayers = new Map<string, Set<string>>();

    constructor(
        @Inject(PLAYER_NOTIFIER_PORT)
        private readonly playerNotifier: PlayerNotifierPort,
    ) {}

    async on1v1Created(battle: Battle1vs1): Promise<void> {
        const roomId = randomUUID();
        const p1 = battle.player1;
        const p2 = battle.player2;

        this.roomToPlayers.set(roomId, [p1, p2]);
        this.playerNotifier.joinPlayersToRoom1v1(roomId, p1.userId, p2.userId);

        const msg = `Battle: ${p1.username} vs ${p2.username}`;
        this.playerNotifier.notifyBattleRoom(
            roomId,
            BattleNotification.MATCH_FOUND,
            msg,
        );

        return Promise.resolve();
    }

    handleReadyPlayers(userId: string, roomId: string, roomSize: number) {
        if (!this.readyPlayers.has(roomId)) {
            this.readyPlayers.set(roomId, new Set<string>());
        }

        const readyRoom = this.readyPlayers.get(roomId)!;
        readyRoom.add(userId);

        if (roomSize == readyRoom.size) {
            this.readyPlayers.delete(roomId);
            this.playerNotifier.notifyBattleRoom(
                roomId,
                BattleNotification.START_BATTLE,
                'Battle has started',
            );
        }
    }
}
