import { BugHunterTaskEntry } from '../../../../domain/types/taskMaps/bugHunterTaskMap';
import { BugHunterTask } from '../../../../domain/types/tasks/bugHunterTask';


export interface BugHunterTaskRepositoryPort {
    getRandomTask(): BugHunterTask;
    getById(taskId: string): BugHunterTaskEntry | null;
}