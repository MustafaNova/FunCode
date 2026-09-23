import { TaskTest } from '../../../domain/entities/taskTest';
import { CodeExecutionResult } from './results/code.execution.result';
import { CompetitiveProgrammingLanguage } from '../../../domain/types/competitiveProgrammingLanguage';


export interface CodeExecutionPort {
    execute(
        code: string,
        functionName: string,
        tests: TaskTest[],
        language: CompetitiveProgrammingLanguage
    ): Promise<CodeExecutionResult>;
}