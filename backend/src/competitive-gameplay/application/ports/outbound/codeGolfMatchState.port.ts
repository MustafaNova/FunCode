import { CodeGolfMatchState } from '../../../domain/types/codeGolfMatchState';

export interface CodeGolfMatchStatePort {
    create(roomId: string, state: CodeGolfMatchState): void;
    getBestScore(roomId: string, userId: string): number | null;
    updateBestScore(roomId: string, userId: string, score: number): void;
    delete(roomId: string): void;
    getEndsAt(roomId: string): number | null;
    getScores(roomId: string): Map<string, number> | null;
    getInstantWinLimit(roomId: string): number | null;
    getTaskId(roomId: string): string | null;
    setTimer(
        roomId: string,
        timer: ReturnType<typeof setTimeout>
    ): void;

    clearTimer(roomId: string): void;
}