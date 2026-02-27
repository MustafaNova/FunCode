import { Task } from '../../../domain/entities/task';

export interface ChallengeRepositoryPort {
    getRandomTask(): Task;
    exists(taskId: string): boolean;
    getTests(taskId: string): any;
}
