import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { RoomGuard } from './guards/room.guard';
import { GameService } from './game.service';
import { UCServicesModule } from '../../infrastructure/uc-wiring/uc.services.module';

@Module({
    imports: [UCServicesModule],
    providers: [GameGateway, RoomGuard, GameService],
    exports: [GameGateway],
})
export class GameGatewayModule {}
