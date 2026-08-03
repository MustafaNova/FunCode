import { Module } from '@nestjs/common';
import { BugHunterProgressRepoModule } from './bugHunterProgressRepo/bugHunterProgressRepo.module';
import { UCServicesModule } from './uc-wiring/uc.services.module';


@Module({
    imports: [BugHunterProgressRepoModule, UCServicesModule],
    exports: [BugHunterProgressRepoModule, UCServicesModule]
})
export class InfrastructureModule {}