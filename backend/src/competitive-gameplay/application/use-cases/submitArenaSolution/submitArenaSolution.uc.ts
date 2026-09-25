import { SubmitArenaSolutionPort } from '../../ports/inbound/submitArenaSolution.port';
import { SubmitCmd } from '../battle-manager/dtos/submit.cmd';
import { SOCKET_EVENTS, SubmitResponse } from '@funcode/shared';
import { BattleNotFoundError } from './errors/battleNotFound.error';
import type { PlayerGatewayPort } from '../../ports/outbound/player.gateway.port';
import type { ClassicValidatorPort } from '../../ports/inbound/validators/classicValidator.port';
import type { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';
import { Battle1v1 } from '../../../domain/entities/battle1v1';
import { BugHunterValidatorPort } from '../../ports/inbound/validators/bugHunterValidator.port';
import { CodeGolfValidatorPort } from '../../ports/inbound/validators/codeGolfValidator.port';


export class SubmitArenaSolutionUC implements SubmitArenaSolutionPort {
    constructor(
        private readonly playerGateway: PlayerGatewayPort,
        private readonly classicValidator: ClassicValidatorPort,
        private readonly bugHunterValidator: BugHunterValidatorPort,
        private readonly codeGolfValidator: CodeGolfValidatorPort,
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

            case 'code-golf-unranked-1v1':
                await this.handleCodeGolfSubmit(submit, battle);
                break;
        }
    }

    private async handleCodeGolfSubmit(submit: SubmitCmd, battle: Battle1v1) {
        console.log('handleCodeGolfSubmit');
        const isValid = await this.codeGolfValidator.validate(submit.taskId, submit.solution);
        await this.handleCodeGolfSubmitResult(isValid, submit, battle);

    }

    private async handleCodeGolfSubmitResult(isValid: boolean, submit: SubmitCmd, battle: Battle1v1) {
        if (!isValid) {
            this.playerGateway.notifyRoom<SubmitResponse>(
                submit.roomId,
                SOCKET_EVENTS.WRONG_SUBMIT,
                { playerName: submit.playerName },
            );
            return;
        }

        this.playerGateway.notifyPlayer(
            submit.userId,
            SOCKET_EVENTS.WIN
        );

        const loserId =
            battle.player1.userId === submit.userId
                ? battle.player2.userId
                : battle.player1.userId;

        this.playerGateway.notifyPlayer(
            loserId,
            SOCKET_EVENTS.LOSE,
        );

        await this.playerGateway.closeRoom(submit.roomId);
        await this.battleRepo.setWinner(submit.roomId, submit.userId);
    }

    private async handleBugHunterSubmit(submit: SubmitCmd, battle: Battle1v1) {
        const isValid = await this.bugHunterValidator.validate(submit.taskId, submit.solution);
        await this.handleBugHunterSubmitResult(isValid, submit, battle);
    }

    private async handleBugHunterSubmitResult(isValid: boolean, submit: SubmitCmd, battle: Battle1v1) {
        if (!isValid) {
            this.playerGateway.notifyRoom<SubmitResponse>(
                submit.roomId,
                SOCKET_EVENTS.WRONG_SUBMIT,
                { playerName: submit.playerName },
            );
            return;
        }

        this.playerGateway.notifyPlayer(
            submit.userId,
            SOCKET_EVENTS.WIN
        );

        const loserId =
            battle.player1.userId === submit.userId
                ? battle.player2.userId
                : battle.player1.userId;

        this.playerGateway.notifyPlayer(
            loserId,
            SOCKET_EVENTS.LOSE,
        );

        await this.playerGateway.closeRoom(submit.roomId);
        await this.battleRepo.setWinner(submit.roomId, submit.userId);
    }

    private async handleClassicSubmit(submit: SubmitCmd, battle: Battle1v1) {
        const isValid = await this.classicValidator.validate(submit.taskId, submit.solution);
        await this.handleClassicSubmitResult(isValid, submit, battle);
    }

    private async handleClassicSubmitResult(isValid: boolean, submit: SubmitCmd, battle: Battle1v1) {
        if (!isValid) {
            this.playerGateway.notifyRoom<SubmitResponse>(
                submit.roomId,
                SOCKET_EVENTS.WRONG_SUBMIT,
                { playerName: submit.playerName },
            );
            return;
        }

        this.playerGateway.notifyPlayer(
            submit.userId,
            SOCKET_EVENTS.WIN
        );

        const loserId =
            battle.player1.userId === submit.userId
                ? battle.player2.userId
                : battle.player1.userId;

        this.playerGateway.notifyPlayer(
            loserId,
            SOCKET_EVENTS.LOSE,
        );

        await this.playerGateway.closeRoom(submit.roomId);
        await this.battleRepo.setWinner(submit.roomId, submit.userId);
    }
}
