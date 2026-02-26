import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { TokenServiceModule } from './token_service/token.service.module';
import { UCServicesModule } from './uc-wiring/uc.services.module';

@Module({
    imports: [PersistenceModule, TokenServiceModule, UCServicesModule],
    exports: [PersistenceModule, TokenServiceModule, UCServicesModule],
})
export class InfrastructureModule {}
