import { TaskTest } from '../entities/taskTest';
import { ClassicTask } from '@funcode/shared';

type TaskEntry<I extends unknown[], O> = {
    task: ClassicTask;
    tests: TaskTest<I, O>[];
};

export type tasksMap = {
    '123456789': TaskEntry<number[], number>;
};
