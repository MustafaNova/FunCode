import { SubmitBugHunterSolutionPort } from '../../ports/inbound/submitBugHunterSolution.port';
import { SubmitBugHunterSolutionCmd } from './submitBugHunterSolution.cmd';
import { BugHunterLevelRepoPort } from '../../ports/outbound/bugHunterLevel.repo.port';
import { BugHunterProgressRepoPort } from '../../ports/outbound/bugHunterProgress.repo.port';
import { BugHunterLevelNotFoundError } from '../errors/bugHunterLevelNotFound.err';
import { BugHunterLevelNotSubmittableError } from './errors/bugHunterLevelNotSubmittable.err';
import { CodeExecutionPort } from '../../ports/outbound/codeExecution.port';
import { SubmitBugHunterSolRes } from './submitBugHunterSolRes';


export class SubmitBugHunterSolutionUC implements SubmitBugHunterSolutionPort {
    constructor(
        private readonly bugHunterLevelRepo: BugHunterLevelRepoPort,
        private readonly bugHunterProgressRepo: BugHunterProgressRepoPort,
        private readonly codeExecutor: CodeExecutionPort,
    ) {}

    async submit(cmd: SubmitBugHunterSolutionCmd): Promise<SubmitBugHunterSolRes> {
        const level = this.bugHunterLevelRepo.getById(cmd.levelId);
        if (level === null) {
            throw new BugHunterLevelNotFoundError();
        }

        const highestUnlockedLevel = await this.bugHunterProgressRepo.getOrCreateHighestUnlockedLevel(cmd.userId);
        if (level.levelNumber !== highestUnlockedLevel) {
            throw new BugHunterLevelNotSubmittableError();
        }

        const codeWithTests = `
        ${cmd.code}
        ${level.tests}
        `;

        const res = await this.codeExecutor.execute(level.language, codeWithTests);
        return {
            success: res
        }

    }
}
