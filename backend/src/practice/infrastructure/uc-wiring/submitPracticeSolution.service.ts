import { SubmitPracticeSolutionUC } from '../../application/use-cases/shared/submitPracticeSolution/submitPracticeSolution.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type PracticeLevelRepoPort } from '../../application/ports/outbound/practiceLevelRepo.port';
import { type PracticeProgressRepoPort } from '../../application/ports/outbound/practiceProgress.repo.port';
import { type CodeExecutionPort } from '../../application/ports/outbound/codeExecution.port';
import { CODE_EXECUTION_PORT, PRACTICE_LEVEL_REPO_PORT, PRACTICE_PROGRESS_REPO_PORT } from '../tokens';

@Injectable()
export class SubmitPracticeSolutionService extends SubmitPracticeSolutionUC {
    constructor(
        @Inject(PRACTICE_LEVEL_REPO_PORT)
        practiceLevelRepo: PracticeLevelRepoPort,
        @Inject(PRACTICE_PROGRESS_REPO_PORT)
        practiceProgressRepo: PracticeProgressRepoPort,
        @Inject(CODE_EXECUTION_PORT)
        codeExecutor: CodeExecutionPort,
    ) {
        super(practiceLevelRepo, practiceProgressRepo, codeExecutor)
    }
}