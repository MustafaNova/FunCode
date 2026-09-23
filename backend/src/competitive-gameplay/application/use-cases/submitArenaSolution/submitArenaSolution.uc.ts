import { SubmitArenaSolutionPort } from '../../ports/inbound/submitArenaSolution.port';
import { SubmitCmd } from '../battle-manager/dtos/submit.cmd';
import { LoseRes, SOCKET_EVENTS, SubmitResponse, WinRes } from '@funcode/shared';
import { BattleNotFoundError } from './errors/battleNotFound.error';
import type { PlayerGatewayPort } from '../../ports/outbound/player.gateway.port';
import type { ClassicValidatorPort } from '../../ports/inbound/classicValidator.port';
import type { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';
import { Battle1v1 } from '../../../domain/entities/battle1v1';


export class SubmitArenaSolutionUC implements SubmitArenaSolutionPort {
    constructor(
        private readonly playerGateway: PlayerGatewayPort,
        private readonly classicValidator: ClassicValidatorPort,
        private readonly battleRepo: BattleRepositoryPort,
    ) {}

    async submit(submit: SubmitCmd): Promise<void> {
        const battle = await this.battleRepo.getByRoomId(submit.roomId);
        if (!battle) {
            throw new BattleNotFoundError();
        }

        switch (battle.gameModeId) {
            case 'classic-unranked-1v1':
                await this.handleClassicSubmit(submit, battle);
                break;

            case 'bug-hunter-unranked-1v1':
                await this.handleBugHunterSubmit(submit, battle);
                break;
        }
    }


    private async handleBugHunterSubmit(submit: SubmitCmd, battle: Battle1v1) {

    }

    private async handleClassicSubmit(submit: SubmitCmd, battle: Battle1v1) {
        const res = await this.classicValidator.validate(submit.taskId, submit.solution);
        await this.handleClassicSubmitResult(res, submit, battle);
    }

    private async handleClassicSubmitResult(res: boolean, submit: SubmitCmd, battle: Battle1v1) {
        if (res) {
            const winnerId = submit.userId;
            const winPayload: WinRes = {
                playerName: submit.playerName,
                solution: submit.solution,
            };
            this.playerGateway.notifyPlayerWin(winnerId, winPayload);

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
