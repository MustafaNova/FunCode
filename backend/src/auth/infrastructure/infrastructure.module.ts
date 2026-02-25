import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { TokenServiceModule } from './token_service/token.service.module';

@Module({
    imports: [PersistenceModule, TokenServiceModule],
    exports: [PersistenceModule, TokenServiceModule],
})
export class InfrastructureModule {}
