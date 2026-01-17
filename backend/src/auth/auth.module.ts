import { Module } from '@nestjs/common';
import { RegistrationController } from './presentation/controllers/registration/registration.controller';
import { UserRegistrationService } from './application/use-cases/user-registration/user-registration.service';
import { REGISTER_USER_PORT } from './application/tokens';
import { PersistenceModule } from './infrastructure/persistence/persistence.module';

@Module({
    imports: [PersistenceModule],
    controllers: [RegistrationController],
    providers: [
        {
            provide: REGISTER_USER_PORT,
            useClass: UserRegistrationService,
        },
    ],
    exports: [],
})
export class AuthModule {}
