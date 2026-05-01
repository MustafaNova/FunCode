import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UCServicesModule } from './uc-wiring/uc.services.module';
import { HtmlValidatorModule } from './htmlValidators/htmlValidator.module';

@Module({
    imports: [DatabaseModule, UCServicesModule, HtmlValidatorModule],
    exports: [DatabaseModule, UCServicesModule, HtmlValidatorModule],
})
export class InfrastructureModule {}
