import { GetBugHunterLevelPort } from '../../ports/inbound/getBugHunterLevel.port';
import { GetBugHunterLevelResult } from './getBugHunterLevel.res';
import { BugHunterLevelRepoPort } from '../../ports/outbound/bugHunterLevel.repo.port';
import { BugHunterProgressRepoPort } from '../../ports/outbound/bugHunterProgress.repo.port';
import { BugHunterLevelNotFoundError } from '../errors/bugHunterLevelNotFound.err';
import { BugHunterLevelLockedError } from './errors/bugHunterLevelLocked.err';


export class GetBugHunterLevelUC implements GetBugHunterLevelPort {
    constructor(
        private readonly bugHunterLevelRepo: BugHunterLevelRepoPort,
        private readonly bugHunterProgressRepo: BugHunterProgressRepoPort,
    ) {}

    async getLevel(userId: string, levelId: string): Promise<GetBugHunterLevelResult> {
        const level = this.bugHunterLevelRepo.getById(levelId);
        if (level === null) {
            throw new BugHunterLevelNotFoundError();
        }

        const highestUnlockedLevel = await this.bugHunterProgressRepo.getOrCreateHighestUnlockedLevel(userId);
        if (highestUnlockedLevel < level.levelNumber) {
            throw new BugHunterLevelLockedError();
        }

        return {
            description: level.description,
            initialCode: level.initialCode,
            language: level.language,
        }

    }
}