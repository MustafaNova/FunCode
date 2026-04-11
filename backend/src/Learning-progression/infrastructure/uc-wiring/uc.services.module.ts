import { Module } from '@nestjs/common';
import { CHANGE_ACTIVE_SCREEN_PORT, GET_PLAYER_PROGRESS_PORT } from './tokens';
import { GetPlayerProgressService } from './getPlayerProgress/getPlayerProgress.service';
import { ChangeActiveScreenService } from './changeActiveScreen/changeActiveScreen.service';
import { DatabaseModule } from '../database/database.module';

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
    ],
    exports: [GET_PLAYER_PROGRESS_PORT, CHANGE_ACTIVE_SCREEN_PORT],
})
export class UCServicesModule {}
