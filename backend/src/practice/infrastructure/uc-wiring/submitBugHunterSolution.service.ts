import { Inject, Injectable } from '@nestjs/common';
import {
    SubmitBugHunterSolutionUC
} from '../../application/use-cases/submitBugHunterSolution/submitBugHunterSolution.uc';
import { type BugHunterLevelRepoPort } from '../../application/ports/outbound/bugHunterLevel.repo.port';
import { type BugHunterProgressRepoPort } from '../../application/ports/outbound/bugHunterProgress.repo.port';
import { type CodeExecutionPort } from '../../application/ports/outbound/codeExecution.port';
import { BUG_HUNTER_LEVEL_REPO_PORT, BUG_HUNTER_PROGRESS_REPO_PORT, CODE_EXECUTION_PORT } from '../tokens';


@Injectable()
export class SubmitBugHunterSolutionService extends SubmitBugHunterSolutionUC {
    constructor(
        @Inject(BUG_HUNTER_LEVEL_REPO_PORT)
        bugHunterLevelRepo: BugHunterLevelRepoPort,
        @Inject(BUG_HUNTER_PROGRESS_REPO_PORT)
        bugHunterProgressRepo: BugHunterProgressRepoPort,
        @Inject(CODE_EXECUTION_PORT)
        codeExecutor: CodeExecutionPort,
    ) {
        super(bugHunterLevelRepo, bugHunterProgressRepo, codeExecutor);
    }
}