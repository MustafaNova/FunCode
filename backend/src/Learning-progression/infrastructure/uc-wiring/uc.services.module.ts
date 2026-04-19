import { Module } from '@nestjs/common';
import {
    CHANGE_ACTIVE_SCREEN_PORT,
    GET_ACTIVE_SCREEN_PORT,
    GET_LEVEL_PORT,
    GET_PLAYER_PROGRESS_PORT,
} from './tokens';
import { GetPlayerProgressService } from './getPlayerProgress/getPlayerProgress.service';
import { ChangeActiveScreenService } from './changeActiveScreen/changeActiveScreen.service';
import { DatabaseModule } from '../database/database.module';
import { GetActiveScreenService } from './getActiveScreen/getActiveScreen.service';
import { GetLevelService } from './getLevel/getLevel.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        {
            provide: GET_PLAYER_PROGRESS_PORT,
            useClass: GetPlayerProgressService,
        },
        {
            provide: CHANGE_ACTIVE_SCREEN_PORT,
            useClass: ChangeActiveScreenService,
        },
        {
            provide: GET_ACTIVE_SCREEN_PORT,
            useClass: GetActiveScreenService,
        },
        {
            provide: GET_LEVEL_PORT,
            useClass: GetLevelService,
        },
    ],
    exports: [
        GET_PLAYER_PROGRESS_PORT,
        CHANGE_ACTIVE_SCREEN_PORT,
        GET_ACTIVE_SCREEN_PORT,
        GET_LEVEL_PORT,
    ],
})
export class UCServicesModule {}
