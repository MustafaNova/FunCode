import { Module } from '@nestjs/common';
import { BugHunterProgressRepoModule } from './bugHunterProgressRepo/bugHunterProgressRepo.module';


@Module({
    imports: [BugHunterProgressRepoModule],
    exports: [BugHunterProgressRepoModule]
})
export class InfrastructureModule {}