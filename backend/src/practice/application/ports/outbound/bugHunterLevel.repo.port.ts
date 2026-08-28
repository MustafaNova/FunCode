import { BugHunterLevel } from '../../../domain/models/bugHunterLevel';


export interface BugHunterLevelRepoPort {
    getById(levelId: string): BugHunterLevel | null,
}