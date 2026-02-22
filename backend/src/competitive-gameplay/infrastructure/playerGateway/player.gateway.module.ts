import { Module } from '@nestjs/common';
import { PlayerGatewayAdapter } from './player.gateway.adapter';
import { PLAYER_GATEWAY_PORT } from './token';

@Module({
    imports: [],
    providers: [
        {
            provide: PLAYER_GATEWAY_PORT,
            useClass: PlayerGatewayAdapter,
        },
    ],
    exports: [PLAYER_GATEWAY_PORT],
})
export class PlayerGatewayModule {}
