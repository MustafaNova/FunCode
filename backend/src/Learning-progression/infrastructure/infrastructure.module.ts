import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UCServicesModule } from './uc-wiring/uc.services.module';
import { HtmlValidatorModule } from './htmlValidators/htmlValidator.module';
import { UserRepoModule } from './userRepo/userRepo.module';

@Module({
    imports: [DatabaseModule, UCServicesModule, HtmlValidatorModule, UserRepoModule],
    exports: [DatabaseModule, UCServicesModule, HtmlValidatorModule, UserRepoModule],
})
export class InfrastructureModule {}
