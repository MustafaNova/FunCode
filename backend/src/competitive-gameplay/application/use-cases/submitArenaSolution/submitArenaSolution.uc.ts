import { SubmitArenaSolutionPort } from '../../ports/inbound/submitArenaSolution.port';
import { SubmitCmd } from '../battle-manager/dtos/submit.cmd';
import {
    BattleAbortedPayload,
    CodeGolfLosePayload,
    CodeGolfScoreUpdatedPayload,
    CodeGolfWinPayload, CodeGolfWrongSubmitPayload,
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
import { CodeGolfMatchStatePort } from '../../ports/outbound/matchStates/codeGolf.match.state.port';
import { BugHunterMatchStatePort } from '../../ports/outbound/matchStates/bugHunter.match.state.port';
import { ClassicMatchStatePort } from '../../ports/outbound/matchStates/classic.match.state.port';


export class SubmitArenaSolutionUC implements SubmitArenaSolutionPort {
    constructor(
        private readonly playerGateway: PlayerGatewayPort,
        private readonly classicValidator: ClassicValidatorPort,
        private readonly bugHunterValidator: BugHunterValidatorPort,
        private readonly codeGolfValidator: CodeGolfValidatorPort,
        private readonly battleRepo: BattleRepositoryPort,
        private readonly codeGolfMatchState: CodeGolfMatchStatePort,
        private readonly bugHunterMatchState: BugHunterMatchStatePort,
        private readonly classicMatchState: ClassicMatchStatePort,
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
        const state = this.codeGolfMatchState.get(submit.roomId);

        if (state === null) {
            await this.abortMatch(submit.roomId);
            this.codeGolfMatchState.delete(submit.roomId);
            return;
        }

        const bestScore = state.playerScores.get(submit.userId);

        if (bestScore === undefined) {
            await this.abortMatch(submit.roomId);
            this.codeGolfMatchState.delete(submit.roomId);
            return;
        }

        if (submit.solution.length >= bestScore ||
            Date.now() >= state.matchEndsAt ||
            Date.now() < state.preparationEndsAt
        ) {
            return;
        }

        this.playerGateway.notifyRoomExceptPlayer(
            submit.userId,
            submit.roomId,
            SOCKET_EVENTS.CODE_GOLF_OPPONENT_SUBMITTED
        )

        const isValid = await this.codeGolfValidator.validate(state.taskId, submit.solution);
        await this.handleCodeGolfSubmitResult(isValid, submit, battle, state.instantWinLimit);

    }

    private async handleCodeGolfSubmitResult(isValid: boolean, submit: SubmitCmd, battle: Battle1v1, instantWinLimit: number) {
        if (!isValid) {
            this.playerGateway.notifyRoom<CodeGolfWrongSubmitPayload>(
                submit.roomId,
                SOCKET_EVENTS.CODE_GOLF_WRONG_SUBMIT,
                { userId: submit.userId }
            )
            return;
        }

        const score = submit.solution.length;

        this.codeGolfMatchState.updateBestScore(
            submit.roomId,
            submit.userId,
            score,
        )

        if (score <= instantWinLimit) {
            await this.finishCodeGolfWithInstantWin(submit, battle);
            return;
        }

        this.playerGateway.notifyRoom<CodeGolfScoreUpdatedPayload>(
            submit.roomId,
            SOCKET_EVENTS.CODE_GOLF_SCORE_UPDATED,
            { userId: submit.userId, bestScore: score }
        )

    }

    private async finishCodeGolfWithInstantWin(submit: SubmitCmd, battle: Battle1v1){
        const finished = await this.battleRepo.finishIfActive(submit.roomId);
        if (!finished) return;

        const winnerId = submit.userId;
        const loserId = submit.userId === battle.player1.userId ? battle.player2.userId : battle.player1.userId;

        this.playerGateway.notifyPlayer<CodeGolfWinPayload>(
            winnerId,
            SOCKET_EVENTS.CODE_GOLF_WIN,
            { reason: 'instant-win' }
        );

        this.playerGateway.notifyPlayer<CodeGolfLosePayload>(
            loserId,
            SOCKET_EVENTS.CODE_GOLF_LOSE,
            { reason: 'instant-lose' }
        );

        await this.battleRepo.setWinner(battle.roomId, winnerId);
        await this.playerGateway.closeRoom(battle.roomId);
        this.codeGolfMatchState.delete(submit.roomId);
    }

    private async handleBugHunterSubmit(submit: SubmitCmd, battle: Battle1v1) {
        const state = this.bugHunterMatchState.get(submit.roomId);
        if (state === null) {
            await this.abortMatch(submit.roomId);
            this.bugHunterMatchState.delete(submit.roomId);
            return;
        }

        const isValid = await this.bugHunterValidator.validate(state.taskId, submit.solution);
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

        const finished = await this.battleRepo.finishIfActive(submit.roomId);
        if (!finished) return;

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
        this.bugHunterMatchState.delete(submit.roomId);
    }

    private async handleClassicSubmit(submit: SubmitCmd, battle: Battle1v1) {
        const state = this.classicMatchState.get(submit.roomId);

        if (state === null) {
            await this.abortMatch(submit.roomId);
            this.classicMatchState.delete(submit.roomId);
            return;
        }

        const isValid = await this.classicValidator.validate(state.taskId, submit.solution);
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

        const finished = await this.battleRepo.finishIfActive(submit.roomId);
        if (!finished) return;

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
        this.classicMatchState.delete(submit.roomId);
    }

    private async abortMatch(roomId: string) {
        this.playerGateway.notifyRoom<BattleAbortedPayload>(
            roomId,
            SOCKET_EVENTS.BATTLE_ABORTED,
            { code: ERROR_CODES.MATCH_STATE_INVALID }
        );
        await this.playerGateway.closeRoom(roomId);
    }
}
