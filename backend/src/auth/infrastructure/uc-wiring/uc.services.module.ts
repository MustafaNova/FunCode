import { Module } from '@nestjs/common';
import { UserLoginService } from './user.login.service';
import { UserRegistrationService } from './user.registration.service';
import { PersistenceModule } from '../persistence/persistence.module';
import { TokenServiceModule } from '../token_service/token.service.module';
import { LOGIN_USER_PORT, REGISTER_USER_PORT } from './tokens';

@Module({
    imports: [PersistenceModule, TokenServiceModule],
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
export class UCServicesModule {}
