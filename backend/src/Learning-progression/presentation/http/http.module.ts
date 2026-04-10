import { Module } from '@nestjs/common';
import { PlayerProgressController } from './controllers/playerProgress/player.progress.controller';
import { UCServicesModule } from '../../infrastructure/uc-wiring/uc.services.module';

@Module({
    imports: [UCServicesModule],
    controllers: [PlayerProgressController],
})
export class HttpModule {}
