import { PracticeLevelRepoPort } from '../../application/ports/outbound/practiceLevelRepo.port';
import { PracticeGameMode } from '@funcode/shared';
import { PracticeLevel } from '../../domain/models/practiceLevel';
import { Injectable } from '@nestjs/common';
import { BUG_HUNTER_LEVELS } from './levels/bugHunterLevels';
import { CODE_GOLF_LEVELS } from './levels/codeGolfLevels';

@Injectable()
export class PracticeLevelRepoAdapter implements PracticeLevelRepoPort {

    getById(gameMode: PracticeGameMode, levelId: string): PracticeLevel | null {
        switch (gameMode) {
            case 'bug-hunter':
                return BUG_HUNTER_LEVELS[levelId] ?? null

            case 'code-golf':
                return CODE_GOLF_LEVELS[levelId] ?? null
        }
    }
}