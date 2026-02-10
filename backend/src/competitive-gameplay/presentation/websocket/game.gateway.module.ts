import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { ApplicationModule } from '../../application/application.module';

@Module({
    imports: [ApplicationModule],
    providers: [GameGateway],
    exports: [GameGateway],
})
export class GameGatewayModule {}
