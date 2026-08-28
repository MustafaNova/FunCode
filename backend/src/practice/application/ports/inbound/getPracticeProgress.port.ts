import { GetPracticeProgressResult } from '../../use-cases/getPracticeProgress/getPracticeProgress.res';
import { PracticeGameMode } from '@funcode/shared';

export interface GetPracticeProgressPort {
    getProgress(userId: string, gameMode: PracticeGameMode): Promise<GetPracticeProgressResult>;
}