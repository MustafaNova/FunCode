import { PracticeProgress } from '../../../domain/models/practiceProgress';
import { PracticeGameMode } from '@funcode/shared';

export interface PracticeProgressRepoPort {
    getOrCreateProgress(userId: string, gameMode: PracticeGameMode): Promise<PracticeProgress>;
    markAllLevelsAsCompleted(userId: string, gameMode: PracticeGameMode): Promise<void>;
    incrementUnlockedLevel(userId: string, gameMode: PracticeGameMode): Promise<void>;

}