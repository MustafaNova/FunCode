import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthenticatedSocket } from '../interfaces';
import { GameGateway } from '../game.gateway';

@Injectable()
export class RoomGuard implements CanActivate {
    constructor(private readonly gateWay: GameGateway) {}

    canActivate(context: ExecutionContext): boolean {
        const client = context.switchToWs().getClient<AuthenticatedSocket>();
        const roomId = client.data.room;
        if (!roomId) {
            client.emit('ERROR', {
                code: 'ROOM_ERROR',
                msg: 'No room was joined',
            });
            return false;
        }

        const room = this.gateWay.server.sockets.adapter.rooms.get(roomId);
        if (!room) {
            client.emit('ERROR', {
                code: 'ROOM_ERROR',
                msg: 'Room does not exist',
            });
            return false;
        }
        return true;
    }
}
