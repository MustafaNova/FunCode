import { Module } from '@nestjs/common';
import { MatchmakingController } from './controllers/matchmaking/matchmaking.controller';
import { UCServicesModule } from '../../infrastructure/uc-wiring/uc.services.module';

@Module({
    imports: [UCServicesModule],
    controllers: [MatchmakingController],
})
export class HttpModule {}
