import { SubmitPracticeSolutionPort } from '../../../ports/inbound/submitPracticeSolution.port';
import { PracticeLevelRepoPort } from '../../../ports/outbound/practiceLevelRepo.port';
import { PracticeProgressRepoPort } from '../../../ports/outbound/practiceProgress.repo.port';
import { CodeExecutionPort } from '../../../ports/outbound/codeExecution.port';
import { SubmitBugHunterSolResult } from '../../bugHunter/submitBugHunterSolution/submitBugHunterSolRes';
import { SubmitPracticeSolutionCmd } from './submitPracticeSolution.cmd';
import { PracticeLevelNotFoundError } from './errors/practiceLevelNotFound.err';
import { PracticeLevelNotSubmittableError } from './errors/practiceLevelNotSubmittable.err';


export class SubmitPracticeSolutionUC implements SubmitPracticeSolutionPort {
    constructor(
        private readonly practiceLevelRepo: PracticeLevelRepoPort,
        private readonly practiceProgressRepo: PracticeProgressRepoPort,
        private readonly codeExecutor: CodeExecutionPort,
    ) {}

    async submit(cmd: SubmitPracticeSolutionCmd): Promise<SubmitBugHunterSolResult> {
        const level = this.practiceLevelRepo.getById(cmd.gameMode, cmd.levelId);
        if (level === null) {
            throw new PracticeLevelNotFoundError();
        }

        const progress = await this.practiceProgressRepo.getOrCreateProgress(cmd.userId, cmd.gameMode);
        if (level.levelNumber !== progress.highestUnlockedLevel) {
            throw new PracticeLevelNotSubmittableError();
        }

        const codeWithTests = `${cmd.code}\n${level.tests}`;

        const testsPassed = await this.codeExecutor.execute(level.language, codeWithTests);

        if (testsPassed) {
            if (level.levelNumber === cmd.maxLevel) {
                await this.practiceProgressRepo.markAllLevelsAsCompleted(cmd.userId, cmd.gameMode)
            } else {
                await this.practiceProgressRepo.incrementUnlockedLevel(cmd.userId, cmd.gameMode);
            }
        }


        return {
            success: testsPassed
        }

    }
}