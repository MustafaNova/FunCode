import { TaskIdError } from './errors/task.id.err';
import { SolutionError } from './errors/solution.err';
import { ClassicValidatorPort } from '../../ports/inbound/classicValidator.port';
import type { ClassicTaskRepositoryPort } from '../../ports/outbound/classic.task.repository.port';
import { tasksMap } from '../../../domain/types/tasksMap';
import { CodeExecutionPort } from '../../ports/outbound/code.execution.port';

export class ClassicValidatorUC implements ClassicValidatorPort {
    constructor(
        private readonly classicTaskRepo: ClassicTaskRepositoryPort,
        private readonly codeExecutor: CodeExecutionPort
    ) {}
    async validate(taskId: string, code: string) {
        if (!this.classicTaskRepo.exists(taskId)) {
            throw new TaskIdError();
        }
        if (!code) {
            throw new SolutionError();
        }

        const tests = this.classicTaskRepo.getTests(taskId as keyof tasksMap);
        const result = await this.codeExecutor.execute(
            code,
            tests.functionName,
            tests.tests,
            'javascript'
        );
        return result.tests.every(test => test.passed);

    }

}
