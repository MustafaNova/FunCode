import { BugHunterTask } from '@funcode/shared';
import { BugHunterTaskEntry } from '../../../../domain/types/taskMaps/bugHunterTaskMap';


export interface BugHunterTaskRepositoryPort {
    getRandomTask(): BugHunterTask;
    getById(taskId: string): BugHunterTaskEntry | null;
}