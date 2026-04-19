import { GetLevelUC } from '../../../application/use-cases/getLevel/getLevel.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { LevelRepositoryPort } from '../../../application/ports/outbound/level.repository.port';
import { LEVEL_REPOSITORY_PORT } from '../../database/tokens';

@Injectable()
export class GetLevelService extends GetLevelUC {
    constructor(
        @Inject(LEVEL_REPOSITORY_PORT)
        levelRepo: LevelRepositoryPort,
    ) {
        super(levelRepo);
    }
}
