import { Task } from '../../../domain/entities/task';
import { taskTestMap } from '../../../domain/types/taskTestMap';

export interface ChallengeRepositoryPort {
    getRandomTask(): Task;
    exists(taskId: string): boolean;
    getTests<K extends keyof taskTestMap>(taskId: K): taskTestMap[K];
}
