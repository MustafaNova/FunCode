import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { GameGatewayModule } from './websocket/game.gateway.module';

@Module({
    imports: [HttpModule, GameGatewayModule],
})
export class ApiModule {}
