import { GetCurrentUserUC } from '../../application/use-cases/GetCurrentUser/getCurrentUser.uc';
import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_PORT } from '../persistence/tokens';
import type { UserRepositoryPort } from '../../application/ports/outbound/user-repository.port';

@Injectable()
export class GetCurrentUserService extends GetCurrentUserUC {
    constructor(
        @Inject(USER_REPOSITORY_PORT)
        userRepo: UserRepositoryPort,
    ) {
        super(userRepo);
    }

}