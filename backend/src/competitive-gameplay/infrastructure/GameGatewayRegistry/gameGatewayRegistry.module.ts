import { Module } from '@nestjs/common';
import { GameGatewayRegistry } from './gameGatewayRegistry';


@Module({
    providers: [GameGatewayRegistry],
    exports: [GameGatewayRegistry]
})
export class GameGatewayRegistryModule {}