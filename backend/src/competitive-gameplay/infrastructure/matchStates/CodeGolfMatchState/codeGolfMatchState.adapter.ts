import { CodeGolfMatchStatePort } from '../../../application/ports/outbound/matchStates/codeGolf.match.state.port';
import { Injectable } from '@nestjs/common';
import { CodeGolfMatchState } from '../../../domain/types/matchStates/codeGolf.match.state';

@Injectable()
export class CodeGolfMatchStateAdapter implements CodeGolfMatchStatePort {
    private readonly states = new Map<string, CodeGolfMatchState>();
    private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();

    create(roomId: string, state: CodeGolfMatchState): void {
        this.states.set(roomId, state);
    }

    get(roomId: string): CodeGolfMatchState | null {
        return this.states.get(roomId) ?? null;
    }

    updateBestScore(roomId: string, userId: string, score: number): void {
        const state = this.states.get(roomId);
        if (!state) return;

        const currentBest = state.playerScores.get(userId);
        if (currentBest === undefined) return;

        if (score < currentBest) {
            state.playerScores.set(userId, score);
        }
    }

    delete(roomId: string): void {
        this.clearTimer(roomId);
        this.states.delete(roomId);
    }

    setTimer(roomId: string, timer: ReturnType<typeof setTimeout>) {
        this.timers.set(roomId, timer);
    }

    clearTimer(roomId: string) {
        const timer = this.timers.get(roomId);

        if (!timer) return;

        clearTimeout(timer);
        this.timers.delete(roomId);
    }
}
