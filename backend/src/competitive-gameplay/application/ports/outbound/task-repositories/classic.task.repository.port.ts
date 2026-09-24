import { ClassicTaskEntry } from '../../../../domain/types/taskMaps/classicTaskMap';
import { ClassicTask } from '@funcode/shared';

export interface ClassicTaskRepositoryPort {
    getRandomTask(): ClassicTask;
    getById(taskId: string): ClassicTaskEntry | null;
}
