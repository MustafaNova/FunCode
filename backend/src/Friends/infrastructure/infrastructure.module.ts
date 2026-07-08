import { Module } from '@nestjs/common';
import { UcServicesModule } from './uc-wiring/uc.services.module';
import { UserLookUpModule } from './UserLookUp/userLookUp.module';

@Module({
    imports: [UcServicesModule, UserLookUpModule],
    exports: [UcServicesModule, UserLookUpModule]
})
export class InfrastructureModule {}