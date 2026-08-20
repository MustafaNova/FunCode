import { GetBugHunterProgressPort } from '../../ports/inbound/getBugHunterProgress.port';
import { GetBugHunterProgressResult } from './getBugHunterProgress.res';
import { BugHunterProgressRepoPort } from '../../ports/outbound/bugHunterProgress.repo.port';


export class GetBugHunterProgressUC implements GetBugHunterProgressPort {
    constructor(
        private readonly bugHunterProgressRepo: BugHunterProgressRepoPort,
    ) {}

    async getProgress(userId: string): Promise<GetBugHunterProgressResult> {
        const highestUnlockedLevel = await this.bugHunterProgressRepo.getOrCreateHighestUnlockedLevel(userId);
        const completedAllLevels = await this.bugHunterProgressRepo.getCompletedAllLevels(userId);
        return {
            highestUnlockedLevel,
            completedAllLevels
        }
    }
}