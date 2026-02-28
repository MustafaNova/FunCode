import { Injectable } from '@nestjs/common';
import { TaskIdError } from '../battle-manager/errors/task.id.err';
import { SolutionError } from '../battle-manager/errors/solution.err';
import { ValidatorPort } from '../../ports/inbound/validator.port';
import type { ChallengeRepositoryPort } from '../../ports/outbound/challenge.repository.port';
import type { UserCodeExecutionPort } from '../../ports/outbound/usercode.execution.port';
import { taskTestMap } from '../../../domain/types/taskTestMap';

@Injectable()
export class ValidatorUC implements ValidatorPort {
    constructor(
        private readonly challengeRepo: ChallengeRepositoryPort,
        private readonly codeExecutor: UserCodeExecutionPort,
    ) {}
    checkSubmit(taskId: string, solution: string) {
        if (!this.challengeRepo.exists(taskId)) {
            console.log('taskId Error');
            throw new TaskIdError();
        }
        if (!solution) {
            console.log('solution Error');
            throw new SolutionError();
        }
        return this.runUserCode(taskId as keyof taskTestMap, solution);
    }

    private runUserCode(taskId: keyof taskTestMap, solution: string) {
        const taskTest = this.challengeRepo.getTests(taskId);
        return this.codeExecutor.run(solution, taskTest);
    }
}
