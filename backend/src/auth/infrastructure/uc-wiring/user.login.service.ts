import { UserLoginUC } from '../../application/use-cases/user-login/user-login.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { UserRepositoryPort } from '../../application/ports/outbound/user-repository.port';
import {
    TOKEN_SERVICE_PORT,
    USER_REPOSITORY_PORT,
} from './tokens';
import type { TokenServicePort } from '../../application/ports/outbound/token-service.port';

@Injectable()
export class UserLoginService extends UserLoginUC {
    constructor(
        @Inject(USER_REPOSITORY_PORT)
        userRepo: UserRepositoryPort,
        @Inject(TOKEN_SERVICE_PORT)
        tokenService: TokenServicePort,
    ) {
        super(userRepo, tokenService);
    }
}
