import { GetBugHunterLevelResult } from '../../use-cases/getBugHunterLevel/getBugHunterLevel.res';


export interface GetBugHunterLevelPort {
    getLevel(userId: string, levelId: string): Promise<GetBugHunterLevelResult>
}