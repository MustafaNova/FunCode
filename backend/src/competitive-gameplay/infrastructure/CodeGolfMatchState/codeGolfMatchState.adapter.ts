import { CodeGolfMatchStatePort } from '../../application/ports/outbound/codeGolfMatchState.port';
import { Injectable } from '@nestjs/common';
import { CodeGolfMatchState } from '../../domain/types/codeGolfMatchState';

@Injectable()
export class CodeGolfMatchStateAdapter implements CodeGolfMatchStatePort {
    private readonly states = new Map<string, CodeGolfMatchState>();

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
        this.states.delete(roomId);
    }
}
