import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GameSocket } from '../interfaces';
import { GameService } from '../game.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class RoomGuard implements CanActivate {
    constructor(private readonly gs: GameService) {}

    canActivate(context: ExecutionContext): boolean {
        const client = context.switchToWs().getClient<GameSocket>();
        const roomId = client.data.room;
        const userId = client.data.user.userId;
        if (!roomId) {
            throw new WsException('joined no room');
        }

        const room = this.gs.getRoom(roomId);
        if (!room) {
            throw new WsException('Room does not exist');
        }
        client.data.roomSize = room.size;
        console.log('ROOMGUARD PASSED');
        return true;
    }
}
