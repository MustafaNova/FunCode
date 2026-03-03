import { Task } from '../../../domain/entities/task';
import { tasksMap } from '../../../domain/types/tasksMap';
import { TaskTestsWithName } from '../../../domain/types/taskTestsWithName';

export interface ChallengeRepositoryPort {
    getRandomTask(): Task;
    exists(taskId: string): boolean;
    getTests<K extends keyof tasksMap>(taskId: K): TaskTestsWithName<K>;
}
