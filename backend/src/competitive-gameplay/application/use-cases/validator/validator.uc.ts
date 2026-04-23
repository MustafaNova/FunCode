import { TaskIdError } from './errors/task.id.err';
import { SolutionError } from './errors/solution.err';
import { ValidatorPort } from '../../ports/inbound/validator.port';
import type { ChallengeRepositoryPort } from '../../ports/outbound/challenge.repository.port';
import type { UserCodeExecutionPort } from '../../ports/outbound/usercode.execution.port';
import { tasksMap } from '../../../domain/types/tasksMap';
import { UserCodeError } from './errors/usercode.err';

export class ValidatorUC implements ValidatorPort {
    constructor(
        private readonly challengeRepo: ChallengeRepositoryPort,
        private readonly codeExecutor: UserCodeExecutionPort,
    ) {}
    checkSubmit(taskId: string, solution: string) {
        if (!this.challengeRepo.exists(taskId)) {
            throw new TaskIdError();
        }
        if (!solution) {
            throw new SolutionError();
        }
        return this.runUserCode(taskId as keyof tasksMap, solution);
    }

    private runUserCode(taskId: keyof tasksMap, solution: string) {
        const testObj = this.challengeRepo.getTests(taskId);
        try {
            return this.codeExecutor.run(
                solution,
                testObj.functionName,
                testObj.tests,
            );
        } catch (err) {
            console.log('UserCodeError occured: ', err.message);
            throw new UserCodeError((err as Error).message);
        }
    }
}
