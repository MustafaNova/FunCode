import { ClassicValidatorUC } from '../../application/use-cases/classicValidator/classic.validator.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { ClassicTaskRepositoryPort } from '../../application/ports/outbound/classic.task.repository.port';
import { CLASSIC_TASK_REPOSITORY_PORT } from '../database/tokens';
import { type CodeExecutionPort } from '../../application/ports/outbound/code.execution.port';
import { CODE_EXECUTION_PORT } from '../codeExecution/tokens';

@Injectable()
export class ClassicValidatorService extends ClassicValidatorUC {
    constructor(
        @Inject(CLASSIC_TASK_REPOSITORY_PORT)
        classicTaskRepo: ClassicTaskRepositoryPort,
        @Inject(CODE_EXECUTION_PORT)
        codeExecutor: CodeExecutionPort,
    ) {
        super(classicTaskRepo, codeExecutor);
    }
}
