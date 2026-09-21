import { TaskTest } from '../../../domain/entities/taskTest';

export interface UserCodeExecutionPort {
    run<I extends unknown[], O>(
        userCode: string,
        functionName: string,
        tests: TaskTest<I, O>[],
    ): boolean;
}
