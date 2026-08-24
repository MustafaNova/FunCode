import { PracticeGameMode } from '../../../domain/enums/practiceGameMode';
import { GetPracticeProgressResult } from '../../use-cases/getPracticeProgress/getPracticeProgress.res';

export interface GetPracticeProgressPort {
    getProgress(userId: string, gameMode: PracticeGameMode): Promise<GetPracticeProgressResult>;
}