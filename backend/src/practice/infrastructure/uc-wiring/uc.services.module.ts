import { Module } from '@nestjs/common';
import {
    GET_PRACTICE_LEVEL_PORT,
    GET_PRACTICE_PROGRESS_REPO_PORT, SUBMIT_BUG_HUNTER_SOLUTION_PORT, SUBMIT_PRACTICE_SOLUTION_PORT
} from '../tokens';
import { SubmitBugHunterSolutionService } from './submitBugHunterSolution.service';
import { CodeExecutionModule } from '../codeExecution/codeExecution.module';
import { PracticeProgressRepoModule } from '../practiceProgressRepo/practiceProgressRepo.module';
import { GetPracticeProgressService } from './getPracticeProgress.service';
import { GetPracticeLevelService } from './getPracticeLevel.service';
import { PracticeLevelRepoModule } from '../practiceLevelRepo/practiceLevelRepo.module';
import { SubmitPracticeSolutionService } from './submitPracticeSolution.service';

@Module({
    imports: [CodeExecutionModule, PracticeProgressRepoModule, PracticeLevelRepoModule],
    providers: [
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
        },
        {
            provide: SUBMIT_PRACTICE_SOLUTION_PORT,
            useClass: SubmitPracticeSolutionService
        }
    ],
    exports: [
        SUBMIT_BUG_HUNTER_SOLUTION_PORT,
        GET_PRACTICE_PROGRESS_REPO_PORT,
        GET_PRACTICE_LEVEL_PORT,
        SUBMIT_PRACTICE_SOLUTION_PORT
    ]
})
export class UCServicesModule {}