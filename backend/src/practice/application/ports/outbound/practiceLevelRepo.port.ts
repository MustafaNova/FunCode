import { PracticeGameMode } from '@funcode/shared';
import { PracticeLevelByMode } from '../../../domain/models/practiceLevelByMode';

export interface PracticeLevelRepoPort {
    getById<T extends PracticeGameMode>(
        gameMode: T,
        levelId: string,
    ): PracticeLevelByMode[T] | null;
}