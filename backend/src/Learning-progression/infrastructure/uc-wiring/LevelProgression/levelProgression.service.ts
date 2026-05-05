import { LevelProgressionUC } from '../../../application/use-cases/LevelProgression/levelProgression.uc';
import { Inject, Injectable } from '@nestjs/common';
import { LevelProgressionRepositoryPort } from '../../../application/ports/outbound/LevelProgressionRepository.port';
import { LEVEL_PROGRESS_REPO_PORT } from '../../database/tokens';

@Injectable()
export class LevelProgressionService extends LevelProgressionUC {
    constructor(
        @Inject(LEVEL_PROGRESS_REPO_PORT)
        levelProgressRepo: LevelProgressionRepositoryPort,
    ) {
        super(levelProgressRepo);
    }
}
