import { PracticeLevelRepoPort } from '../../application/ports/outbound/practiceLevelRepo.port';
import { PracticeGameMode } from '@funcode/shared';
import { Injectable } from '@nestjs/common';
import { BUG_HUNTER_LEVELS } from './levels/bugHunterLevels';
import { CODE_GOLF_LEVELS } from './levels/codeGolfLevels';
import { PracticeLevelByMode } from '../../domain/models/practiceLevelByMode';

@Injectable()
export class PracticeLevelRepoAdapter implements PracticeLevelRepoPort {

    getById<T extends PracticeGameMode>(gameMode: T, levelId: string): PracticeLevelByMode[T] | null {
        switch (gameMode) {
            case 'bug-hunter':
                return (BUG_HUNTER_LEVELS[levelId] ?? null) as PracticeLevelByMode[T] | null;

            case 'code-golf':
                return (CODE_GOLF_LEVELS[levelId] ?? null) as PracticeLevelByMode[T] | null;
        }
    }
}