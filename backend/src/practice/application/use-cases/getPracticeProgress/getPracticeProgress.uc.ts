import { GetPracticeProgressPort } from '../../ports/inbound/getPracticeProgress.port';
import { GetPracticeProgressResult } from './getPracticeProgress.res';
import { PracticeProgressRepoPort } from '../../ports/outbound/practiceProgress.repo.port';
import { PracticeGameMode } from '@funcode/shared';


export class GetPracticeProgressUC implements GetPracticeProgressPort {
    constructor(
        private readonly practiceProgressRepo: PracticeProgressRepoPort,
    ) {}

    async getProgress(userId: string, gameMode: PracticeGameMode): Promise<GetPracticeProgressResult> {
        const progress = await this.practiceProgressRepo.getOrCreateProgress(userId, gameMode);
        return {
            highestUnlockedLevel: progress.highestUnlockedLevel,
            completedAllLevels: progress.completedAllLevels
        }
    }
}