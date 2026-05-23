import { StartCourseUC } from '../../../application/use-cases/startCourse/startCourse.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { ActiveScreenRepositoryPort } from '../../../application/ports/outbound/activeScreenRepository.port';
import { ACTIVE_SCREEN_REPOSITORY_PORT } from '../../database/tokens';
import { type UserRepoPort } from '../../../application/ports/outbound/userRepo.port';
import { USER_REPO } from '../../userRepo/tokens';

@Injectable()
export class StartCourseService extends StartCourseUC {
    constructor(
        @Inject(ACTIVE_SCREEN_REPOSITORY_PORT)
        activeScreenRepo: ActiveScreenRepositoryPort,
        @Inject(USER_REPO)
        userRepo: UserRepoPort,
    ) {
        super(activeScreenRepo, userRepo);
    }
}
