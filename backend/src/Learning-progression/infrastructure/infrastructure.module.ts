import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UCServicesModule } from './uc-wiring/uc.services.module';

@Module({
    imports: [DatabaseModule, UCServicesModule],
    exports: [DatabaseModule, UCServicesModule],
})
export class InfrastructureModule {}
