import { Task, TaskTest } from '../entities/task';

type TaskEntry<I extends unknown[], O> = {
    task: Task;
    tests: TaskTest<I, O>[];
};

export type tasksMap = {
    '123456789': TaskEntry<number[], number>;
};
