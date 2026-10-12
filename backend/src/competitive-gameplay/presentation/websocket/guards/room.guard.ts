import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GameSocket } from '../interfaces';
import { WsException } from '@nestjs/websockets';
import { GameGatewayRegistry } from '../../../infrastructure/GameGatewayRegistry/gameGatewayRegistry';

@Injectable()
export class RoomGuard implements CanActivate {
    constructor(private readonly gameGatewayRegistry: GameGatewayRegistry) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const client = context.switchToWs().getClient<GameSocket>();
        const roomId = client.data.room;
        if (!roomId) {
            throw new WsException('joined no room');
        }

        const room = await this.gameGatewayRegistry.getServer().in(roomId).fetchSockets();
        if (room.length == 0) {
            throw new WsException('Room does not exist');
        }
        client.data.roomSize = room.length;
        return true;
    }
}
