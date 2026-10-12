import { GetPracticeLevelPort } from '../../../ports/inbound/getPracticeLevel.port';
import { PracticeGameMode } from '@funcode/shared';
import { GetPracticeLevelResult } from './getPracticeLevelResult/getPracticeLevelResult';
import { PracticeLevelRepoPort } from '../../../ports/outbound/practiceLevelRepo.port';
import { PracticeLevelNotFoundError } from './errors/practiceLevelNotFound.err';
import { PracticeProgressRepoPort } from '../../../ports/outbound/practiceProgress.repo.port';
import { PracticeLevelLockedError } from './errors/practiceLevelLocked.err';
import { PracticeLevel } from '../../../../domain/models/practiceLevel';


export class GetPracticeLevelUC implements GetPracticeLevelPort {
    constructor(
        private readonly practiceLevelRepo: PracticeLevelRepoPort,
        private readonly practiceProgressRepo: PracticeProgressRepoPort,
    ) {}

    async getLevel(userId: string, gameMode: PracticeGameMode, levelId: string): Promise<GetPracticeLevelResult> {
        const level = this.practiceLevelRepo.getById(gameMode, levelId);
        if (level === null) {
            console.log('PracticeLevelNotFoundError')
            throw new PracticeLevelNotFoundError();
        }

        const practiceProgress = await this.practiceProgressRepo.getOrCreateProgress(userId, gameMode);
        if (practiceProgress.highestUnlockedLevel < level.levelNumber) {
            console.log('PracticeLevelLockedError')
            throw new PracticeLevelLockedError();
        }

        return this.mapPracticeLevelToResult(level);
    }

    private mapPracticeLevelToResult(
        level: PracticeLevel,
    ): GetPracticeLevelResult {
        switch (level.gameMode) {
            case 'bug-hunter':
                return {
                    gameMode: level.gameMode,
                    levelNumber: level.levelNumber,
                    description: level.description,
                    initialCode: level.initialCode,
                    language: level.language,
                };

            case 'code-golf':
                return {
                    gameMode: level.gameMode,
                    levelNumber: level.levelNumber,
                    description: level.description,
                    initialCode: level.initialCode,
                    language: level.language,
                    maxCharacters: level.maxCharacters,
                };
        }
    }

}