import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GameSocket } from '../interfaces';
import { GameService } from '../game.service';
import { ErrorCodes } from '../../../../common/error.codes';

@Injectable()
export class RoomGuard implements CanActivate {
    constructor(private readonly gs: GameService) {}

    canActivate(context: ExecutionContext): boolean {
        console.log('RoomGuard activated');
        const client = context.switchToWs().getClient<GameSocket>();
        const roomId = client.data.room;
        const userId = client.data.user.userId;
        if (!roomId) {
            this.gs.sendError(userId, ErrorCodes.NO_ROOM_ID, 'joined no room');
            return false;
        }

        const room = this.gs.getRoom(roomId);
        if (!room) {
            this.gs.sendError(
                userId,
                ErrorCodes.ROOM_NOT_EXIST,
                'Room does not exist',
            );
            return false;
        }
        client.data.roomSize = room.size;
        return true;
    }
}
