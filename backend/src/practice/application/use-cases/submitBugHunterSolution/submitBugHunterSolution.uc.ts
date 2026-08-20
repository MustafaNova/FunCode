import { SubmitBugHunterSolutionPort } from '../../ports/inbound/submitBugHunterSolution.port';
import { SubmitBugHunterSolutionCmd } from './submitBugHunterSolution.cmd';
import { BugHunterLevelRepoPort } from '../../ports/outbound/bugHunterLevel.repo.port';
import { BugHunterProgressRepoPort } from '../../ports/outbound/bugHunterProgress.repo.port';
import { BugHunterLevelNotFoundError } from '../errors/bugHunterLevelNotFound.err';
import { BugHunterLevelNotSubmittableError } from './errors/bugHunterLevelNotSubmittable.err';
import { CodeExecutionPort } from '../../ports/outbound/codeExecution.port';
import { SubmitBugHunterSolResult } from './submitBugHunterSolRes';
import { MAX_BUG_HUNTER_LEVEL } from '../../../domain/constants/bugHunter.constants';


export class SubmitBugHunterSolutionUC implements SubmitBugHunterSolutionPort {
    constructor(
        private readonly bugHunterLevelRepo: BugHunterLevelRepoPort,
        private readonly bugHunterProgressRepo: BugHunterProgressRepoPort,
        private readonly codeExecutor: CodeExecutionPort,
    ) {}

    async submit(cmd: SubmitBugHunterSolutionCmd): Promise<SubmitBugHunterSolResult> {
        console.log('submitBugHunter use case');
        const level = this.bugHunterLevelRepo.getById(cmd.levelId);
        if (level === null) {
            throw new BugHunterLevelNotFoundError();
        }

        const highestUnlockedLevel = await this.bugHunterProgressRepo.getOrCreateHighestUnlockedLevel(cmd.userId);
        if (level.levelNumber !== highestUnlockedLevel) {
            throw new BugHunterLevelNotSubmittableError();
        }

        const codeWithTests = `${cmd.code}\n${level.tests}`;

        const testsPassed = await this.codeExecutor.execute(level.language, codeWithTests);

        if (testsPassed) {
            if (level.levelNumber === MAX_BUG_HUNTER_LEVEL) {
                await this.bugHunterProgressRepo.markAllLevelsAsCompleted(cmd.userId)
            } else {
                await this.bugHunterProgressRepo.incrementUnlockedLevel(cmd.userId);
            }
        }


        return {
            success: testsPassed
        }

    }
}
