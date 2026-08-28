import { PracticeGameMode } from '@funcode/shared';
import { PracticeLevel } from '../../../domain/models/practiceLevel';

export interface PracticeLevelRepoPort {
    getById(
        gameMode: PracticeGameMode,
        levelId: string,
    ): PracticeLevel | null;
}