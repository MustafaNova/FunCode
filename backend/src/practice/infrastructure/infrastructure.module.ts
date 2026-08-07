import { Module } from '@nestjs/common';
import { BugHunterProgressRepoModule } from './bugHunterProgressRepo/bugHunterProgressRepo.module';
import { UCServicesModule } from './uc-wiring/uc.services.module';
import { BugHunterLevelRepoModule } from './bugHunterLevelRepo/bugHunterLevelRepo.module';


@Module({
    imports: [BugHunterProgressRepoModule, UCServicesModule, BugHunterLevelRepoModule],
    exports: [BugHunterProgressRepoModule, UCServicesModule, BugHunterLevelRepoModule]
})
export class InfrastructureModule {}