import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GameSocket } from '../interfaces';
import { GameService } from '../game.service';
import { RoomError } from '../errors/room.errors';

@Injectable()
export class RoomGuard implements CanActivate {
    constructor(private readonly gs: GameService) {}

    canActivate(context: ExecutionContext): boolean {
        const client = context.switchToWs().getClient<GameSocket>();
        const roomId = client.data.room;
        if (!roomId) {
            this.gs.sendClient(client, RoomError.NO_ROOM, 'joined no room');
            return false;
        }

        const room = this.gs.getRoom(roomId);
        if (!room) {
            this.gs.sendClient(
                client,
                RoomError.ROOM_NOT_EXIST,
                'Room does not exist',
            );
            return false;
        }
        client.data.roomSize = room.size;
        return true;
    }
}
