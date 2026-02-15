import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class GameService {
    private server: Server;

    setServer(server: Server) {
        this.server = server;
    }

    getRoom(roomId: string) {
        return this.server.sockets.adapter.rooms.get(roomId);
    }

    sendClient(client: Socket, event: string, msg: string) {
        client.emit(event, { msg: msg });
    }

    sendRoom(roomId: string, event: string, msg: string) {
        this.server.to(roomId).emit(event, { msg: msg });
    }

    createNewRoom1v1() {
        return;
    }
}
