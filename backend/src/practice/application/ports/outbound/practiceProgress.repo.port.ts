import { PracticeGameMode } from '../../../domain/enums/practiceGameMode';
import { PracticeProgress } from '../../../domain/models/practiceProgress';

export interface PracticeProgressRepoPort {
    getOrCreateProgress(userId: string, gameMode: PracticeGameMode): Promise<PracticeProgress>;

}