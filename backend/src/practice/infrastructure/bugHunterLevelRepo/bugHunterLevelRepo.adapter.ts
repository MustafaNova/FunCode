import { BugHunterLevelRepoPort } from '../../application/ports/outbound/bugHunterLevel.repo.port';
import { BugHunterLevel } from '../../domain/models/bugHunterLevel';
import { BUG_HUNTER_LEVELS } from './bugHunterLevels';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BugHunterLevelRepoAdapter implements BugHunterLevelRepoPort {

    getById(levelId: string): BugHunterLevel | null {
        return BUG_HUNTER_LEVELS[levelId] ?? null;
    }
}