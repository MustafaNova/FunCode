import { BugHunterTask } from '@funcode/shared';


export interface BugHunterTaskRepositoryPort {
    getRandomTask(): BugHunterTask;
}