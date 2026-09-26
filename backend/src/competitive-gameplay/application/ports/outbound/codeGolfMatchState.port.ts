import { CodeGolfMatchState } from '../../../domain/types/codeGolfMatchState';

export interface CodeGolfMatchStatePort {
    create(roomId: string, state: CodeGolfMatchState): void;
    getBestScore(roomId: string, userId: string): number | null;
    updateBestScore(roomId: string, userId: string, score: number): void;
    delete(roomId: string): void;
}