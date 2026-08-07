import { BugHunterLevel } from '../../../domain/value-objects/bugHunterLevel';


export interface BugHunterLevelRepoPort {
    getById(levelId: string): BugHunterLevel | null,
}