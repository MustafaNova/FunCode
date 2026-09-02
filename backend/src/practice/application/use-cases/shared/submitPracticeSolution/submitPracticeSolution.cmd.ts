import { PracticeGameMode } from '@funcode/shared';

export interface SubmitPracticeSolutionCmd {
    userId: string,
    gameMode: PracticeGameMode,
    levelId: string,
    code: string,
    maxLevel: number,
}