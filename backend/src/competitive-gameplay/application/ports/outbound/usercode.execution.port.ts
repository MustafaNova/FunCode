import { TaskTest } from '../../../domain/entities/task';

export interface UserCodeExecutionPort {
    run<I extends unknown[], O>(
        userCode: string,
        functionName: string,
        tests: TaskTest<I, O>[],
    ): boolean;
}
