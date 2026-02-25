import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UserLoginService } from './use-cases/user-login/user-login.service';
import { LOGIN_USER_PORT, REGISTER_USER_PORT } from './tokens';
import { UserRegistrationService } from './use-cases/user-registration/user-registration.service';

@Module({
    imports: [InfrastructureModule],
    controllers: [],
    providers: [
        {
            provide: REGISTER_USER_PORT,
            useClass: UserRegistrationService,
        },
        {
            provide: LOGIN_USER_PORT,
            useClass: UserLoginService,
        },
    ],
    exports: [REGISTER_USER_PORT, LOGIN_USER_PORT],
})
export class ApplicationModule {}
