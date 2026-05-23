import { Module } from '@nestjs/common';
import {
    START_COURSE_PORT,
    GET_ACTIVE_SCREEN_PORT,
    GET_LEVEL_PORT,
    GET_PLAYER_PROGRESS_PORT, LEVEL_PROGRESS_PORT, VALIDATE_TASK_PORT,
} from './tokens';
import { GetPlayerProgressService } from './getPlayerProgress/getPlayerProgress.service';
import { StartCourseService } from './startCourse/startCourse.service';
import { DatabaseModule } from '../database/database.module';
import { GetActiveScreenService } from './getActiveScreen/getActiveScreen.service';
import { GetLevelService } from './getLevel/getLevel.service';
import { HtmlValidatorModule } from '../htmlValidators/htmlValidator.module';
import { ValidateTaskService } from './validateTask/validateTask.service';
import { LevelProgressionService } from './LevelProgression/levelProgression.service';
import { UserRepoModule } from '../userRepo/userRepo.module';

@Module({
    imports: [DatabaseModule, HtmlValidatorModule, UserRepoModule],
    providers: [
        {
            provide: GET_PLAYER_PROGRESS_PORT,
            useClass: GetPlayerProgressService,
        },
        {
            provide: START_COURSE_PORT,
            useClass: StartCourseService,
        },
        {
            provide: GET_ACTIVE_SCREEN_PORT,
            useClass: GetActiveScreenService,
        },
        {
            provide: GET_LEVEL_PORT,
            useClass: GetLevelService,
        },
        {
            provide: VALIDATE_TASK_PORT,
            useClass: ValidateTaskService,
        },
        {
            provide: LEVEL_PROGRESS_PORT,
            useClass: LevelProgressionService,
        },
    ],
    exports: [
        GET_PLAYER_PROGRESS_PORT,
        START_COURSE_PORT,
        GET_ACTIVE_SCREEN_PORT,
        GET_LEVEL_PORT,
        VALIDATE_TASK_PORT,
        LEVEL_PROGRESS_PORT,
    ],
})
export class UCServicesModule {}
