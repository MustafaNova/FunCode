import { SubmitArenaSolutionPort } from '../../ports/inbound/submitArenaSolution.port';
import { SubmitCmd } from '../battle-manager/dtos/submit.cmd';
import {
    BattleAbortedPayload,
    CodeGolfScoreUpdatedPayload,
    ERROR_CODES,
    SOCKET_EVENTS,
    SubmitResponse
} from '@funcode/shared';
import { BattleNotFoundError } from './errors/battleNotFound.error';
import type { PlayerGatewayPort } from '../../ports/outbound/player.gateway.port';
import type { ClassicValidatorPort } from '../../ports/inbound/validators/classicValidator.port';
import type { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';
import { Battle1v1 } from '../../../domain/entities/battle1v1';
import { BugHunterValidatorPort } from '../../ports/inbound/validators/bugHunterValidator.port';
import { CodeGolfValidatorPort } from '../../ports/inbound/validators/codeGolfValidator.port';
import { CodeGolfMatchStatePort } from '../../ports/outbound/codeGolfMatchState.port';


export class SubmitArenaSolutionUC implements SubmitArenaSolutionPort {
    constructor(
        private readonly playerGateway: PlayerGatewayPort,
        private readonly classicValidator: ClassicValidatorPort,
        private readonly bugHunterValidator: BugHunterValidatorPort,
        private readonly codeGolfValidator: CodeGolfValidatorPort,
        private readonly battleRepo: BattleRepositoryPort,
        private readonly codeGolfMatchState: CodeGolfMatchStatePort,
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
        const bestScore = this.codeGolfMatchState.getBestScore(submit.roomId, submit.userId);
        const endsAt = this.codeGolfMatchState.getEndsAt(submit.roomId);
        if (bestScore === null ||
            endsAt === null ||
            submit.solution.length >= bestScore ||
            Date.now() >= endsAt
        ) {
            return;
        }

        const instantWinLimit = this.codeGolfMatchState.getInstantWinLimit(submit.roomId);
        const taskId = this.codeGolfMatchState.getTaskId(submit.roomId);
        if (instantWinLimit === null || taskId === null) {
            this.playerGateway.notifyRoom<BattleAbortedPayload>(
                submit.roomId,
                SOCKET_EVENTS.BATTLE_ABORTED,
                { code: ERROR_CODES.CODE_GOLF_MATCH_STATE_INVALID }
            )
            await this.playerGateway.closeRoom(battle.roomId);
            this.codeGolfMatchState.delete(submit.roomId);
            return;
        }

        const isValid = await this.codeGolfValidator.validate(taskId, submit.solution);
        await this.handleCodeGolfSubmitResult(isValid, submit, battle, instantWinLimit);

    }

    private async handleCodeGolfSubmitResult(isValid: boolean, submit: SubmitCmd, battle: Battle1v1, instantWinLimit: number) {
        if (!isValid) {
            this.playerGateway.notifyPlayer(
                submit.userId,
                SOCKET_EVENTS.WRONG_SUBMIT
            );
            return;
        }

        const score = submit.solution.length;

        this.codeGolfMatchState.updateBestScore(
            submit.roomId,
            submit.userId,
            score,
        )

        if (score <= instantWinLimit) {
            await this.handleCodeGolfInstantWin(submit, battle);
            return;
        }

        this.playerGateway.notifyRoom<CodeGolfScoreUpdatedPayload>(
            submit.roomId,
            SOCKET_EVENTS.CODE_GOLF_SCORE_UPDATED,
            { userId: submit.userId, bestScore: score }
        )

    }

    private async handleBugHunterSubmit(submit: SubmitCmd, battle: Battle1v1) {
        const isValid = await this.bugHunterValidator.validate(submit.taskId, submit.solution);
        await this.handleBugHunterSubmitResult(isValid, submit, battle);
    }

    private async handleCodeGolfInstantWin(submit: SubmitCmd, battle: Battle1v1){
        const winnerId = submit.userId;
        const loserId = submit.userId === battle.player1.userId ? battle.player2.userId : battle.player1.userId;

        this.playerGateway.notifyPlayer(
            winnerId,
            SOCKET_EVENTS.WIN,
        );

        this.playerGateway.notifyPlayer(
            loserId,
            SOCKET_EVENTS.LOSE,
        );

        await this.battleRepo.setWinner(battle.roomId, winnerId);
        await this.playerGateway.closeRoom(battle.roomId);
        this.codeGolfMatchState.delete(submit.roomId);
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
