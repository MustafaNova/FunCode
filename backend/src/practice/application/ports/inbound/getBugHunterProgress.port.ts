import { GetBugHunterProgressRes } from '../../use-cases/getBugHunterProgress/getBugHunterProgress.res';


export interface GetBugHunterProgressPort {
    getProgress(userId: string): Promise<GetBugHunterProgressRes>;
}