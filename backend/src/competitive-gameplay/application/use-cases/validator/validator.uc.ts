import { TaskIdError } from './errors/task.id.err';
import { SolutionError } from './errors/solution.err';
import { ValidatorPort } from '../../ports/inbound/validator.port';
import type { ClassicTaskRepositoryPort } from '../../ports/outbound/classic.task.repository.port';
import type { UserCodeExecutionPort } from '../../ports/outbound/usercode.execution.port';
import { tasksMap } from '../../../domain/types/tasksMap';
import { UserCodeError } from './errors/usercode.err';

export class ValidatorUC implements ValidatorPort {
    constructor(
        private readonly classicTaskRepo: ClassicTaskRepositoryPort,
        private readonly codeExecutor: UserCodeExecutionPort,
    ) {}
    checkSubmit(taskId: string, solution: string) {
        if (!this.classicTaskRepo.exists(taskId)) {
            throw new TaskIdError();
        }
        if (!solution) {
            throw new SolutionError();
        }
        return this.runUserCode(taskId as keyof tasksMap, solution);
    }

    private runUserCode(taskId: keyof tasksMap, solution: string) {
        const testObj = this.classicTaskRepo.getTests(taskId);
        try {
            return this.codeExecutor.run(
                solution,
                testObj.functionName,
                testObj.tests,
            );
        } catch {
            throw new UserCodeError();
        }
    }
}
