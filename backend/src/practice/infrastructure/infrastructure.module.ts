import { Module } from '@nestjs/common';
import { BugHunterProgressRepoModule } from './bugHunterProgressRepo/bugHunterProgressRepo.module';
import { UCServicesModule } from './uc-wiring/uc.services.module';
import { BugHunterLevelRepoModule } from './bugHunterLevelRepo/bugHunterLevelRepo.module';
import { CodeExecutionModule } from './codeExecution/codeExecution.module';


@Module({
    imports: [BugHunterProgressRepoModule, UCServicesModule, BugHunterLevelRepoModule, CodeExecutionModule],
    exports: [BugHunterProgressRepoModule, UCServicesModule, BugHunterLevelRepoModule, CodeExecutionModule]
})
export class InfrastructureModule {}