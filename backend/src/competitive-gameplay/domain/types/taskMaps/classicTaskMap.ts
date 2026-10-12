import { TaskTest } from '../../entities/taskTest';
import { ClassicTask } from '../tasks/classicTask';

export type ClassicTaskEntry<I extends unknown[] = unknown[], O = unknown> = {
    task: ClassicTask;
    tests: TaskTest<I, O>[];
};

export type ClassicTaskMap = Record<string, ClassicTaskEntry<number[], number>>
