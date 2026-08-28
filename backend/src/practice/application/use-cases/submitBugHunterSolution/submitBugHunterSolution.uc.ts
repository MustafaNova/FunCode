import { SubmitBugHunterSolutionPort } from '../../ports/inbound/submitBugHunterSolution.port';
import { SubmitBugHunterSolutionCmd } from './submitBugHunterSolution.cmd';
import { BugHunterLevelRepoPort } from '../../ports/outbound/bugHunterLevel.repo.port';
import { BugHunterLevelNotFoundError } from '../errors/bugHunterLevelNotFound.err';
import { BugHunterLevelNotSubmittableError } from './errors/bugHunterLevelNotSubmittable.err';
import { CodeExecutionPort } from '../../ports/outbound/codeExecution.port';
import { SubmitBugHunterSolResult } from './submitBugHunterSolRes';
import { MAX_BUG_HUNTER_LEVEL } from '../../../domain/constants/bugHunter.constants';
import { PracticeProgressRepoPort } from '../../ports/outbound/practiceProgress.repo.port';


export class SubmitBugHunterSolutionUC implements SubmitBugHunterSolutionPort {
    constructor(
        private readonly bugHunterLevelRepo: BugHunterLevelRepoPort,
        private readonly practiceProgressRepo: PracticeProgressRepoPort,
        private readonly codeExecutor: CodeExecutionPort,
    ) {}

    async submit(cmd: SubmitBugHunterSolutionCmd): Promise<SubmitBugHunterSolResult> {
        const level = this.bugHunterLevelRepo.getById(cmd.levelId);
        if (level === null) {
            throw new BugHunterLevelNotFoundError();
        }

        const progress = await this.practiceProgressRepo.getOrCreateProgress(cmd.userId, 'bug-hunter');
        if (level.levelNumber !== progress.highestUnlockedLevel) {
            throw new BugHunterLevelNotSubmittableError();
        }

        const codeWithTests = `${cmd.code}\n${level.tests}`;

        const testsPassed = await this.codeExecutor.execute(level.language, codeWithTests);

        if (testsPassed) {
            if (level.levelNumber === MAX_BUG_HUNTER_LEVEL) {
                await this.practiceProgressRepo.markAllLevelsAsCompleted(cmd.userId, 'bug-hunter')
            } else {
                await this.practiceProgressRepo.incrementUnlockedLevel(cmd.userId, 'bug-hunter');
            }
        }


        return {
            success: testsPassed
        }

    }
}
