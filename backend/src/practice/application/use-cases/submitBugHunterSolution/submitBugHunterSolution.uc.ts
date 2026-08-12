import { SubmitBugHunterSolutionPort } from '../../ports/inbound/submitBugHunterSolution.port';
import { SubmitBugHunterSolutionCmd } from './submitBugHunterSolution.cmd';
import { BugHunterLevelRepoPort } from '../../ports/outbound/bugHunterLevel.repo.port';
import { BugHunterProgressRepoPort } from '../../ports/outbound/bugHunterProgress.repo.port';
import { BugHunterLevelNotFoundError } from '../errors/bugHunterLevelNotFound.err';
import { BugHunterLevelNotSubmittableError } from './errors/bugHunterLevelNotSubmittable.err';


export class SubmitBugHunterSolutionUC implements SubmitBugHunterSolutionPort {
    constructor(
        private readonly bugHunterLevelRepo: BugHunterLevelRepoPort,
        private readonly bugHunterProgressRepo: BugHunterProgressRepoPort,
    ) {}

    async submit(cmd: SubmitBugHunterSolutionCmd): Promise<boolean> {
        const level = this.bugHunterLevelRepo.getById(cmd.levelId);
        if (level === null) {
            throw new BugHunterLevelNotFoundError();
        }

        const highestUnlockedLevel = await this.bugHunterProgressRepo.getOrCreateHighestUnlockedLevel(cmd.userId);
        if (level.levelNumber !== highestUnlockedLevel) {
            throw new BugHunterLevelNotSubmittableError();
        }

        const executableCode = `
        ${cmd.code}
        ${level.tests}
        `;


    }
}
