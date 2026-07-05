import { UserRegistrationUC } from '../../application/use-cases/user-registration/user-registration.uc';
import { Inject, Injectable } from '@nestjs/common';
import type { UserRepositoryPort } from '../../application/ports/outbound/user-repository.port';
import { USER_REPOSITORY_PORT } from '../persistence/tokens';
import { type InviteCodeGeneratorPort } from '../../application/ports/outbound/inviteCodeGenerator.port';
import { INVITE_CODE_GENERATOR_PORT } from '../inviteCodeGenerator/tokens';

@Injectable()
export class UserRegistrationService extends UserRegistrationUC {
    constructor(
        @Inject(USER_REPOSITORY_PORT)
        userRepo: UserRepositoryPort,
        @Inject(INVITE_CODE_GENERATOR_PORT)
        inviteCodeGenerator: InviteCodeGeneratorPort,
    ) {
        super(userRepo, inviteCodeGenerator);
    }
}
