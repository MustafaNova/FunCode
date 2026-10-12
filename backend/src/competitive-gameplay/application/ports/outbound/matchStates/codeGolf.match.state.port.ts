import { CodeGolfMatchState } from '../../../../domain/types/matchStates/codeGolf.match.state';

export interface CodeGolfMatchStatePort {
    create(roomId: string, state: CodeGolfMatchState): void;
    get(roomId: string): CodeGolfMatchState | null;
    updateBestScore(roomId: string, userId: string, score: number): void;
    delete(roomId: string): void;
    setTimer(
        roomId: string,
        timer: ReturnType<typeof setTimeout>
    ): void;
    clearTimer(roomId: string): void;
}