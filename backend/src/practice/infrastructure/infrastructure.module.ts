import { Module } from '@nestjs/common';
import { UCServicesModule } from './uc-wiring/uc.services.module';
import { CodeExecutionModule } from './codeExecution/codeExecution.module';
import { PracticeProgressRepoModule } from './practiceProgressRepo/practiceProgressRepo.module';
import { PracticeLevelRepoModule } from './practiceLevelRepo/practiceLevelRepo.module';


@Module({
    imports: [
        UCServicesModule,
        CodeExecutionModule,
        PracticeProgressRepoModule,
        PracticeLevelRepoModule
    ],
    exports: [
        UCServicesModule,
        CodeExecutionModule,
        PracticeProgressRepoModule,
        PracticeLevelRepoModule
    ]
})
export class InfrastructureModule {}