import { Module } from '@nestjs/common';
import { PlayerProgressController } from './controllers/playerProgress/player.progress.controller';
import { UCServicesModule } from '../../infrastructure/uc-wiring/uc.services.module';
import { ActiveScreenController } from './controllers/activeScreen/active.screen.controller';
import { LevelsController } from './controllers/levels/levels.controller';

@Module({
    imports: [UCServicesModule],
    controllers: [
        PlayerProgressController,
        ActiveScreenController,
        LevelsController,
    ],
})
export class HttpModule {}
