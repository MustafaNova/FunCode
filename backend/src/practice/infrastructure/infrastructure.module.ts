import { Module } from '@nestjs/common';
import { BugHunterProgressRepoModule } from './bugHunterProgressRepo/bugHunterProgressRepo.module';
import { UCServicesModule } from './uc-wiring/uc.services.module';
import { BugHunterLevelRepoModule } from './bugHunterLevelRepo/bugHunterLevelRepo.module';
import { CodeExecutionModule } from './codeExecution/codeExecution.module';
import { PracticeProgressRepoModule } from './practiceProgressRepo/practiceProgressRepo.module';
import { PracticeLevelRepoModule } from './practiceLevelRepo/practiceLevelRepo.module';


@Module({
    imports: [
        BugHunterProgressRepoModule,
        UCServicesModule,
        BugHunterLevelRepoModule,
        CodeExecutionModule,
        PracticeProgressRepoModule,
        PracticeLevelRepoModule
    ],
    exports: [
        BugHunterProgressRepoModule,
        UCServicesModule,
        BugHunterLevelRepoModule,
        CodeExecutionModule,
        PracticeProgressRepoModule,
        PracticeLevelRepoModule
    ]
})
export class InfrastructureModule {}