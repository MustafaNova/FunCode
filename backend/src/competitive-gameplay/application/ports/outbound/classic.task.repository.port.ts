import { tasksMap } from '../../../domain/types/tasksMap';
import { TaskTestsWithName } from '../../../domain/types/taskTestsWithName';
import { ClassicTask } from '@funcode/shared';

export interface ClassicTaskRepositoryPort {
    getRandomTask(): ClassicTask;
    exists(taskId: string): boolean;
    getTests<K extends keyof tasksMap>(taskId: K): TaskTestsWithName<K>;
}
