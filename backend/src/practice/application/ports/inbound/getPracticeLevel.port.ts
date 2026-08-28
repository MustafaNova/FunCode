import { PracticeGameMode } from '@funcode/shared';
import { GetPracticeLevelResult } from '../../use-cases/getPracticeLevel/getPracticeLevelResult/getPracticeLevelResult';

export interface GetPracticeLevelPort {
    getLevel(userId: string, gameMode: PracticeGameMode, levelId: string): Promise<GetPracticeLevelResult>;
}