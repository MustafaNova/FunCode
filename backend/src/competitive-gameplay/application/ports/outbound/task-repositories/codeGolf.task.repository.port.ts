import { CodeGolfTask } from '@funcode/shared';
import { CodeGolfTaskEntry } from '../../../../domain/types/taskMaps/codeGolfTaskMap';

export interface CodeGolfTaskRepositoryPort {
    getRandomTask(): CodeGolfTask;
    getById(taskId: string): CodeGolfTaskEntry | null;
}