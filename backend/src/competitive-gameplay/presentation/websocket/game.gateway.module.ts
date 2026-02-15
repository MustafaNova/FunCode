import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { ApplicationModule } from '../../application/application.module';
import { RoomGuard } from './guards/room.guard';
import { GameService } from './game.service';

@Module({
    imports: [ApplicationModule],
    providers: [GameGateway, RoomGuard, GameService],
    exports: [GameGateway],
})
export class GameGatewayModule {}
