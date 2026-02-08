import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { GameGateway } from './websocket/game.gateway';

@Module({
    imports: [HttpModule, GameGateway],
})
export class ApiModule {}
