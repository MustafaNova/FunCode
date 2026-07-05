import { Module } from '@nestjs/common';
import { UserLoginService } from './user.login.service';
import { UserRegistrationService } from './user.registration.service';
import { PersistenceModule } from '../persistence/persistence.module';
import { TokenServiceModule } from '../token_service/token.service.module';
import { GET_CURRENT_USER_PORT, LOGIN_USER_PORT, REGISTER_USER_PORT } from './tokens';
import { GetCurrentUserService } from './getCurrentUser.service';
import { InviteCodeGeneratorModule } from '../inviteCodeGenerator/inviteCodeGenerator.module';

@Module({
    imports: [PersistenceModule, TokenServiceModule, InviteCodeGeneratorModule],
    providers: [
        {
            provide: REGISTER_USER_PORT,
            useClass: UserRegistrationService,
        },
        {
            provide: LOGIN_USER_PORT,
            useClass: UserLoginService,
        },
        {
            provide: GET_CURRENT_USER_PORT,
            useClass: GetCurrentUserService,
        }
    ],
    exports: [REGISTER_USER_PORT, LOGIN_USER_PORT, GET_CURRENT_USER_PORT],
})
export class UCServicesModule {}
