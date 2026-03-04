import { ValidatorUC } from '../../application/use-cases/validator/validator.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { ChallengeRepositoryPort } from '../../application/ports/outbound/challenge.repository.port';
import type { UserCodeExecutionPort } from '../../application/ports/outbound/usercode.execution.port';
import { CHALLENGE_REPOSITORY_PORT, USERCODE_EXECUTION_PORT } from './tokens';

@Injectable()
export class ValidatorService extends ValidatorUC {
    constructor(
        @Inject(CHALLENGE_REPOSITORY_PORT)
        challengeRepo: ChallengeRepositoryPort,
        @Inject(USERCODE_EXECUTION_PORT)
        codeExecutor: UserCodeExecutionPort,
    ) {
        super(challengeRepo, codeExecutor);
    }
}
