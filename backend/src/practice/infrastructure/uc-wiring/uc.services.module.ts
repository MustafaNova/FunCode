import { Module } from '@nestjs/common';
import {
    GET_BUG_HUNTER_LEVEL_PORT, GET_BUG_HUNTER_PROGRESS_PORT, GET_PRACTICE_LEVEL_PORT,
    GET_PRACTICE_PROGRESS_REPO_PORT, SUBMIT_BUG_HUNTER_SOLUTION_PORT
} from '../tokens';
import { GetBugHunterProgressService } from './getBugHunterProgress.service';
import { BugHunterProgressRepoModule } from '../bugHunterProgressRepo/bugHunterProgressRepo.module';
import { GetBugHunterLevelService } from './getBugHunterLevel.service';
import { BugHunterLevelRepoModule } from '../bugHunterLevelRepo/bugHunterLevelRepo.module';
import { SubmitBugHunterSolutionService } from './submitBugHunterSolution.service';
import { CodeExecutionModule } from '../codeExecution/codeExecution.module';
import { PracticeProgressRepoModule } from '../practiceProgressRepo/practiceProgressRepo.module';
import { GetPracticeProgressService } from './getPracticeProgress.service';
import { GetPracticeLevelService } from './getPracticeLevel.service';

@Module({
    imports: [BugHunterProgressRepoModule, BugHunterLevelRepoModule, CodeExecutionModule, PracticeProgressRepoModule],
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
        },
        {
            provide: GET_PRACTICE_PROGRESS_REPO_PORT,
            useClass: GetPracticeProgressService,
        },
        {
            provide: GET_PRACTICE_LEVEL_PORT,
            useClass: GetPracticeLevelService,
        }
    ],
    exports: [
        GET_BUG_HUNTER_PROGRESS_PORT,
        GET_BUG_HUNTER_LEVEL_PORT,
        SUBMIT_BUG_HUNTER_SOLUTION_PORT,
        GET_PRACTICE_PROGRESS_REPO_PORT,
        GET_PRACTICE_LEVEL_PORT
    ]
})
export class UCServicesModule {}