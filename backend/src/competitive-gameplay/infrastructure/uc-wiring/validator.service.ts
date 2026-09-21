import { ValidatorUC } from '../../application/use-cases/validator/validator.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { ClassicTaskRepositoryPort } from '../../application/ports/outbound/classic.task.repository.port';
import type { UserCodeExecutionPort } from '../../application/ports/outbound/usercode.execution.port';
import { CLASSIC_TASK_REPOSITORY_PORT } from '../database/tokens';
import { USERCODE_EXECUTION_PORT } from '../userCodeExecution/tokens';

@Injectable()
export class ValidatorService extends ValidatorUC {
    constructor(
        @Inject(CLASSIC_TASK_REPOSITORY_PORT)
        classicTaskRepo: ClassicTaskRepositoryPort,
        @Inject(USERCODE_EXECUTION_PORT)
        codeExecutor: UserCodeExecutionPort,
    ) {
        super(classicTaskRepo, codeExecutor);
    }
}
