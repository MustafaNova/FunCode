import { CodeGolfValidatorUC } from '../../application/use-cases/validators/codeGolfValidator/codeGolf.validator.uc';
import { Inject, Injectable } from '@nestjs/common';
import {
    type CodeGolfTaskRepositoryPort
} from '../../application/ports/outbound/task-repositories/codeGolf.task.repository.port';
import { type CodeExecutionPort } from '../../application/ports/outbound/code.execution.port';
import { CODE_GOLF_TASK_REPOSITORY_PORT } from '../database/tokens';
import { CODE_EXECUTION_PORT } from '../codeExecution/tokens';

@Injectable()
export class CodeGolfValidatorService extends CodeGolfValidatorUC {
    constructor(
        @Inject(CODE_GOLF_TASK_REPOSITORY_PORT)
        codeGolfTaskRepo: CodeGolfTaskRepositoryPort,
        @Inject(CODE_EXECUTION_PORT)
        codeExecutor: CodeExecutionPort
    ) {
        super(codeGolfTaskRepo, codeExecutor);
    }
}
