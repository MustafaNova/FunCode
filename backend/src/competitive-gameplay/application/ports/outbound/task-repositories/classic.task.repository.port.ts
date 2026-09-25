import { ClassicTaskEntry } from '../../../../domain/types/taskMaps/classicTaskMap';
import { ClassicTask } from '../../../../domain/types/tasks/classicTask';

export interface ClassicTaskRepositoryPort {
    getRandomTask(): ClassicTask;
    getById(taskId: string): ClassicTaskEntry | null;
}
