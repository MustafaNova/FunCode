import { Module } from '@nestjs/common';
import { PlayerNotifierAdapter } from './player.notifier.adapter';
import { GameGatewayModule } from '../../presentation/websocket/game.gateway.module';

@Module({
    imports: [GameGatewayModule],
    providers: [PlayerNotifierAdapter],
})
export class NotifierModule {}
