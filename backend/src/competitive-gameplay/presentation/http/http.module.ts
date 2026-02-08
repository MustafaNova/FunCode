import { Module } from '@nestjs/common';
import { ApplicationModule } from '../../application/application.module';
import { MatchmakingController } from './controllers/matchmaking/matchmaking.controller';

@Module({
    imports: [ApplicationModule],
    controllers: [MatchmakingController],
})
export class HttpModule {}
