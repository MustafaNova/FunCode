import { TaskTest } from '../../entities/taskTest';
import { ClassicTask } from '@funcode/shared';

export type ClassicTaskEntry<I extends unknown[] = unknown[], O = unknown> = {
    task: ClassicTask;
    tests: TaskTest<I, O>[];
};

export type ClassicTaskMap = Record<string, ClassicTaskEntry<number[], number>>
