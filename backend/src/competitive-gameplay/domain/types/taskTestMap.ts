import { TaskTest } from '../entities/task';

export type taskTestMap = {
    '123456789': { functionName: string; tests: TaskTest<number[], number>[] };
};
