import { tasksMap } from '../../../domain/types/tasksMap';
import { TaskTestsWithName } from '../../../domain/types/taskTestsWithName';
import { Task } from '../../../../../../shared/types.shared';

export interface ChallengeRepositoryPort {
    getRandomTask(): { task: Task };
    exists(taskId: string): boolean;
    getTests<K extends keyof tasksMap>(taskId: K): TaskTestsWithName<K>;
}
