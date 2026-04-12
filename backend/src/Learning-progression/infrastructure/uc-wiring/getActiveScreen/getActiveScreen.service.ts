import { GetActiveScreenUC } from '../../../application/use-cases/getActiveScreen/getActiveScreen.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { ActiveScreenRepositoryPort } from '../../../application/ports/outbound/activeScreenRepository.port';
import { ACTIVE_SCREEN_REPOSITORY_PORT } from '../../database/tokens';

@Injectable()
export class GetActiveScreenService extends GetActiveScreenUC {
    constructor(
        @Inject(ACTIVE_SCREEN_REPOSITORY_PORT)
        activeScreenRepo: ActiveScreenRepositoryPort,
    ) {
        super(activeScreenRepo);
    }
}
