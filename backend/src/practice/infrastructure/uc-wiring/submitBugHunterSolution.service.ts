import { Inject, Injectable } from '@nestjs/common';
import {
    SubmitBugHunterSolutionUC
} from '../../application/use-cases/submitBugHunterSolution/submitBugHunterSolution.uc';
import { type BugHunterLevelRepoPort } from '../../application/ports/outbound/bugHunterLevel.repo.port';
import { type CodeExecutionPort } from '../../application/ports/outbound/codeExecution.port';
import {
    BUG_HUNTER_LEVEL_REPO_PORT,
    CODE_EXECUTION_PORT,
    PRACTICE_PROGRESS_REPO_PORT
} from '../tokens';
import { type PracticeProgressRepoPort } from '../../application/ports/outbound/practiceProgress.repo.port';


@Injectable()
export class SubmitBugHunterSolutionService extends SubmitBugHunterSolutionUC {
    constructor(
        @Inject(BUG_HUNTER_LEVEL_REPO_PORT)
        bugHunterLevelRepo: BugHunterLevelRepoPort,
        @Inject(PRACTICE_PROGRESS_REPO_PORT)
        practiceProgressRepo: PracticeProgressRepoPort,
        @Inject(CODE_EXECUTION_PORT)
        codeExecutor: CodeExecutionPort,
    ) {
        super(bugHunterLevelRepo, practiceProgressRepo, codeExecutor);
    }
}