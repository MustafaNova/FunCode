import { UserRegistrationUC } from '../../application/use-cases/user-registration/user-registration.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { UserRepositoryPort } from '../../application/ports/outbound/user-repository.port';
import { USER_REPOSITORY_PORT } from './tokens';

@Injectable()
export class UserRegistrationService extends UserRegistrationUC {
    constructor(
        @Inject(USER_REPOSITORY_PORT)
        userRepo: UserRepositoryPort,
    ) {
        super(userRepo);
    }
}
