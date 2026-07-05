import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { TokenServiceModule } from './token_service/token.service.module';
import { UCServicesModule } from './uc-wiring/uc.services.module';
import { InviteCodeGeneratorModule } from './inviteCodeGenerator/inviteCodeGenerator.module';

@Module({
    imports: [PersistenceModule, TokenServiceModule, UCServicesModule, InviteCodeGeneratorModule],
    exports: [PersistenceModule, TokenServiceModule, UCServicesModule, InviteCodeGeneratorModule],
})
export class InfrastructureModule {}
