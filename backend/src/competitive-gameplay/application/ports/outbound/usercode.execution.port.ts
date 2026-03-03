import { TaskTest } from '../../../domain/entities/task';

export interface UserCodeExecutionPort {
    run<I, O>(
        userCode: string,
        functionName: string,
        tests: TaskTest<I, O>[],
    ): boolean;
}
