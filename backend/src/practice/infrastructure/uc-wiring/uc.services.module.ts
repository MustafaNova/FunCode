import { Module } from '@nestjs/common';
import { GET_BUG_HUNTER_LEVEL_PORT, GET_BUG_HUNTER_PROGRESS_PORT, SUBMIT_BUG_HUNTER_SOLUTION_PORT } from '../tokens';
import { GetBugHunterProgressService } from './getBugHunterProgress.service';
import { BugHunterProgressRepoModule } from '../bugHunterProgressRepo/bugHunterProgressRepo.module';
import { GetBugHunterLevelService } from './getBugHunterLevel.service';
import { BugHunterLevelRepoModule } from '../bugHunterLevelRepo/bugHunterLevelRepo.module';
import { SubmitBugHunterSolutionService } from './submitBugHunterSolution.service';

@Module({
    imports: [BugHunterProgressRepoModule, BugHunterLevelRepoModule],
    providers: [
        {
            provide: GET_BUG_HUNTER_PROGRESS_PORT,
            useClass: GetBugHunterProgressService,
        },
        {
            provide: GET_BUG_HUNTER_LEVEL_PORT,
            useClass: GetBugHunterLevelService,
        },
        {
            provide: SUBMIT_BUG_HUNTER_SOLUTION_PORT,
            useClass: SubmitBugHunterSolutionService,
        }
    ],
    exports: [
        GET_BUG_HUNTER_PROGRESS_PORT,
        GET_BUG_HUNTER_LEVEL_PORT,
        SUBMIT_BUG_HUNTER_SOLUTION_PORT
    ]
})
export class UCServicesModule {}