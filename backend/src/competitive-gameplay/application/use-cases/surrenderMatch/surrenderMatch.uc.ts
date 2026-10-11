import { SurrenderMatchPort } from '../../ports/inbound/surrender.match.port';
import { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';
import { BattleNotFoundError } from '../errors/battleNotFound.error';
import { PlayerNotInBattleError } from './errors/playerNotInBattle.error';
import { PlayerGatewayPort } from '../../ports/outbound/player.gateway.port';
import { MatchResultPayload, SOCKET_EVENTS } from '@funcode/shared';
import { MatchCleanupPort } from '../../ports/outbound/match.cleanup.port';


export class SurrenderMatchUC implements SurrenderMatchPort {
    constructor(
        private readonly battleRepo: BattleRepositoryPort,
        private readonly playerGateway: PlayerGatewayPort,
        private readonly matchCleanup: MatchCleanupPort
    ) {}

    async surrender(userId: string, roomId: string): Promise<void> {
        const battle = await this.battleRepo.getByRoomId(roomId);

        if (battle === null) {
            throw new BattleNotFoundError()
        }

        const player1Id = battle.player1.userId;
        const player2Id = battle.player2.userId;

        if (userId !== player1Id && userId !== player2Id) {
            throw new PlayerNotInBattleError();
        }

        const finished = await this.battleRepo.finishIfActive(roomId);
        if (!finished) return;

        const winnerId = userId === player1Id ? player2Id : player1Id;

        this.playerGateway.notifyPlayer<MatchResultPayload>(
            winnerId,
            SOCKET_EVENTS.WIN,
            { reason: 'surrender' }
        )

        this.playerGateway.notifyPlayer<MatchResultPayload>(
            userId,
            SOCKET_EVENTS.LOSE,
            { reason: 'surrender' }
        )

        await this.battleRepo.setWinner(roomId, winnerId);
        await this.matchCleanup.cleanup(roomId, battle.gameModeId);

    }
}
