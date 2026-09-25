import { CodeGolfValidatorPort } from '../../../ports/inbound/validators/codeGolfValidator.port';
import { CodeGolfTaskRepositoryPort } from '../../../ports/outbound/task-repositories/codeGolf.task.repository.port';
import { CodeExecutionPort } from '../../../ports/outbound/code.execution.port';
import { TaskIdError } from '../classicValidator/errors/task.id.err';


export class CodeGolfValidatorUC implements CodeGolfValidatorPort {
    constructor(
        private readonly codeGolfTaskRepo: CodeGolfTaskRepositoryPort,
        private readonly codeExecutor: CodeExecutionPort
    ) {}


    async validate(taskId: string, code: string): Promise<boolean> {
        const taskData = this.codeGolfTaskRepo.getById(taskId);

        if (!taskData) {
            throw new TaskIdError();
        }
        console.log('CODE LENGTH: ', code.length);
        if (code.length > taskData.task.characterLimit) {
            return false;
        }

        const result = await this.codeExecutor.execute(
            code,
            taskData.task.functionName,
            taskData.tests,
            taskData.task.language,
        )

        if (result.executionFailed) {
            return false;
        }

        return result.tests.every(test => test.passed);
    }
}