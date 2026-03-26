import { TaskTest } from '../entities/task';
import { Task } from '@shared/types.shared';

type TaskEntry<I extends unknown[], O> = {
    task: Task;
    tests: TaskTest<I, O>[];
};

export type tasksMap = {
    '123456789': TaskEntry<number[], number>;
};
