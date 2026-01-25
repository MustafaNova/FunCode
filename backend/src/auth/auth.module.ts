import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth/auth.controller';
import { UserRegistrationService } from './application/use-cases/user-registration/user-registration.service';
import { LOGIN_USER_PORT, REGISTER_USER_PORT } from './application/tokens';
import { PersistenceModule } from './infrastructure/persistence/persistence.module';
import { UserLoginService } from './application/use-cases/user-login/user-login.service';
import { AuthInfrastructureModule } from './infrastructure/auth/auth.infrastructure.module';

@Module({
    imports: [PersistenceModule, AuthInfrastructureModule],
    controllers: [AuthController],
    providers: [
        {
            provide: REGISTER_USER_PORT,
            useClass: UserRegistrationService,
        },
        {
            provide: LOGIN_USER_PORT,
            useClass: UserLoginService,
        },
        UserLoginService,
    ],
    exports: [],
})
export class AuthModule {}
