import { Module } from '@nestjs/common';
import { RegistrationController } from './presentation/controllers/registration/registration.controller';
import { UserRegistrationService } from './application/use-cases/user-registration/user-registration.service';
import { REGISTER_USER_PORT, USER_REPOSITORY_PORT } from './application/tokens';
import { UserRepositoryAdapter } from './infrastructure/user-repository/user-repository.adapter';

@Module({
    imports: [],
    controllers: [RegistrationController],
    providers: [
        {
            provide: REGISTER_USER_PORT,
            useClass: UserRegistrationService,
        },
        {
            provide: USER_REPOSITORY_PORT,
            useClass: UserRepositoryAdapter,
        },
    ],
    exports: [],
})
export class AuthModule {}
