import { BugHunterValidatorPort } from '../../ports/inbound/bugHunterValidator.port';
import { BugHunterTaskRepositoryPort } from '../../ports/outbound/task-repositories/bugHunter.task.repository.port';
import { TaskIdError } from '../classicValidator/errors/task.id.err';
import { CodeExecutionPort } from '../../ports/outbound/code.execution.port';


export class BugHunterValidatorUC implements BugHunterValidatorPort {
    constructor(
        private readonly taskRepo: BugHunterTaskRepositoryPort,
        private readonly codeExecution: CodeExecutionPort
    ) {}

    async validate(taskId: string, code: string): Promise<boolean> {
        const taskData = this.taskRepo.getById(taskId);

        if (!taskData) {
            throw new TaskIdError();
        }

        const result = await this.codeExecution.execute(
            code,
            taskData.task.functionName,
            taskData.tests,
            taskData.task.language
        );

        return result.tests.every(test => test.passed);
    }
}
