import { BugHunterValidatorUC } from '../../application/use-cases/bugHunterValidator/bugHunter.validator.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type BugHunterTaskRepositoryPort } from '../../application/ports/outbound/task-repositories/bugHunter.task.repository.port';
import { type CodeExecutionPort } from '../../application/ports/outbound/code.execution.port';
import { BUG_HUNTER_TASK_REPOSITORY_PORT } from '../database/tokens';
import { CODE_EXECUTION_PORT } from '../codeExecution/tokens';

@Injectable()
export class BugHunterValidatorService extends BugHunterValidatorUC {
    constructor(
        @Inject(BUG_HUNTER_TASK_REPOSITORY_PORT)
        taskRepo: BugHunterTaskRepositoryPort,
        @Inject(CODE_EXECUTION_PORT)
        codeExecution: CodeExecutionPort
    ) {
        super(taskRepo, codeExecution);
    }
}