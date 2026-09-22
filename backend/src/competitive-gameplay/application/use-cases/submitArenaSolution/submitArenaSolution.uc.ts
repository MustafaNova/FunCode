import { SubmitArenaSolutionPort } from '../../ports/inbound/submitArenaSolution.port';
import { SubmitCmd } from '../battle-manager/dtos/submit.cmd';
import { LoseRes, SOCKET_EVENTS, SubmitResponse, WinRes } from '@funcode/shared';
import { BattleNotFoundError } from '../battle-manager/errors/battleNotFound.error';
import type { PlayerGatewayPort } from '../../ports/outbound/player.gateway.port';
import type { ValidatorPort } from '../../ports/inbound/validator.port';
import type { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';


export class SubmitArenaSolutionUC implements SubmitArenaSolutionPort {
    constructor(
        private readonly playerGateway: PlayerGatewayPort,
        private readonly validator: ValidatorPort,
        private readonly battleRepo: BattleRepositoryPort,
    ) {}

    async submit(submit: SubmitCmd): Promise<void> {
        const res = this.validator.checkSubmit(submit.taskId, submit.solution);
        await this.notifySubmitRes(res, submit);
    }

    private async notifySubmitRes(res: boolean, submit: SubmitCmd) {
        if (res) {
            const winnerId = submit.userId;
            const winPayload: WinRes = {
                playerName: submit.playerName,
                solution: submit.solution,
            };
            this.playerGateway.notifyPlayerWin(winnerId, winPayload);

            const battle =
                await this.battleRepo.getByRoomId(
                    submit.roomId,
                );

            if (!battle) {
                throw new BattleNotFoundError();
            }

            const loserPlayer =
                battle.player1.userId === winnerId
                    ? battle.player2
                    : battle.player1;

            const losePayload: LoseRes = {
                playerName: loserPlayer.username,
                solution: submit.solution,
            };

            this.playerGateway.notifyPlayerLose(
                loserPlayer.userId,
                losePayload,
            );

            await this.playerGateway.closeRoom(submit.roomId);
            await this.battleRepo.setWinner(submit.roomId, submit.userId);
        } else {
            const payload: SubmitResponse = {
                type: 'wrong',
                playerName: submit.playerName,
            };

            this.playerGateway.notifyRoom(
                submit.roomId,
                SOCKET_EVENTS.WRONG_SUBMIT,
                payload,
            );
        }
    }
}