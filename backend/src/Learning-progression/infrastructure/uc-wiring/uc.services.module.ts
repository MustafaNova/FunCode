import { Module } from '@nestjs/common';
import { GET_PLAYER_PROGRESS_PORT } from './tokens';
import { GetPlayerProgressService } from './getPlayerProgress.service';

@Module({
    providers: [
        {
            provide: GET_PLAYER_PROGRESS_PORT,
            useClass: GetPlayerProgressService,
        },
    ],
    exports: [GET_PLAYER_PROGRESS_PORT],
})
export class UCServicesModule {}
