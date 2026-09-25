import { CodeGolfTaskEntry } from '../../../../domain/types/taskMaps/codeGolfTaskMap';
import { CodeGolfTask } from '../../../../domain/types/tasks/codeGolfTask';

export interface CodeGolfTaskRepositoryPort {
    getRandomTask(): CodeGolfTask;
    getById(taskId: string): CodeGolfTaskEntry | null;
}