import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GameSocket } from '../interfaces';
import { GameService } from '../game.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class RoomGuard implements CanActivate {
    constructor(private readonly gs: GameService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const client = context.switchToWs().getClient<GameSocket>();
        const roomId = client.data.room;
        if (!roomId) {
            throw new WsException('joined no room');
        }

        const room = await this.gs.getRoom(roomId);
        if (room == 0) {
            throw new WsException('Room does not exist');
        }
        client.data.roomSize = room;
        return true;
    }
}
