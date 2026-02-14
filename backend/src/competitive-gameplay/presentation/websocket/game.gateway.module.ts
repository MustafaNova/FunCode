import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { ApplicationModule } from '../../application/application.module';
import { RoomGuard } from './guards/room.guard';

@Module({
    imports: [ApplicationModule],
    providers: [GameGateway, RoomGuard],
    exports: [GameGateway],
})
export class GameGatewayModule {}
