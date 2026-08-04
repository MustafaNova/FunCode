import { GetBugHunterProgressPort } from '../../ports/inbound/getBugHunterProgress.port';
import { GetBugHunterProgressRes } from './getBugHunterProgress.res';
import { BugHunterProgressRepoPort } from '../../ports/outbound/bugHunterProgress.repo.port';


export class GetBugHunterProgressUC implements GetBugHunterProgressPort {
    constructor(
        private readonly bugHunterProgressRepo: BugHunterProgressRepoPort,
    ) {}

    async getProgress(userId: string): Promise<GetBugHunterProgressRes> {
        const highestUnlockedLevel = await this.bugHunterProgressRepo.getOrCreateHighestUnlockedLevel(userId);
        return { highestUnlockedLevel }
    }
}