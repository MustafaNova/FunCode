import { CodeGolfMatchStatePort } from '../../application/ports/outbound/codeGolfMatchState.port';
import { Injectable } from '@nestjs/common';
import { CodeGolfMatchState } from '../../domain/types/codeGolfMatchState';

@Injectable()
export class CodeGolfMatchStateAdapter implements CodeGolfMatchStatePort {
    private readonly states = new Map<string, CodeGolfMatchState>();
    private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();

    create(roomId: string, state: CodeGolfMatchState): void {
        this.states.set(roomId, state);
    }

    getBestScore(roomId: string, userId: string): number | null {
        const state = this.states.get(roomId);
        if (!state) return null;

        return state.playerScores.get(userId) ?? null
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

    getEndsAt(roomId: string): number | null {
        return this.states.get(roomId)?.endsAt ?? null;
    }

    getScores(roomId: string): Map<string, number> | null {
        return this.states.get(roomId)?.playerScores ?? null;
    }

    getInstantWinLimit(roomId: string): number | null {
        return this.states.get(roomId)?.instantWinLimit ?? null;
    }

    getTaskId(roomId: string): string | null {
        return this.states.get(roomId)?.taskId ?? null;
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
