import { TaskIdError } from './errors/task.id.err';
import { ClassicValidatorPort } from '../../../ports/inbound/validators/classicValidator.port';
import type { ClassicTaskRepositoryPort } from '../../../ports/outbound/task-repositories/classic.task.repository.port';
import { CodeExecutionPort } from '../../../ports/outbound/code.execution.port';

export class ClassicValidatorUC implements ClassicValidatorPort {
    constructor(
        private readonly classicTaskRepo: ClassicTaskRepositoryPort,
        private readonly codeExecutor: CodeExecutionPort
    ) {}
    async validate(taskId: string, code: string) {
        const taskData = this.classicTaskRepo.getById(taskId);

        if (!taskData) {
            throw new TaskIdError();
        }

        const result = await this.codeExecutor.execute(
            code,
            taskData.task.functionName,
            taskData.tests,
            taskData.task.language
        );

        if (result.executionFailed) {
            return false;
        }

        return result.tests.every(test => test.passed);

    }

}
