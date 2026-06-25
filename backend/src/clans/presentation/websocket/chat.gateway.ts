import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect, OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import { UseFilters } from '@nestjs/common';
import { WsExceptionFilter } from '../../../common/ws.exception.filter';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { type ChatSocket } from './chatSocket.types';
import { CLAN_SOCKET_EVENTS } from '@funcode/shared';


@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
    namespace: '/chat',
    cors: {
        origin: process.env['FRONTEND_URL'],
        credentials: true,
    },
})
export class ChatGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    @WebSocketServer()
    server: Server;

    constructor(
        private readonly cs: ChatService
    ) {}

    afterInit(server: Server): any {
        this.cs.setServer(server);
    }

    handleConnection(client: Socket): any {
        console.log('ChatGateway.handleConnection');
        this.cs.authenticateClient(client);
    }

    handleDisconnect(client: any): any {
        console.log('ChatGateway disconnection');
    }

    @SubscribeMessage(CLAN_SOCKET_EVENTS.JOIN_CLAN_CHAT)
    async joinClanChat(
        @ConnectedSocket() client: ChatSocket,
        @MessageBody() payload: { clanId: string },
    ) {
        console.log("started joinClanChat");
        await this.cs.joinClanRoom(client, payload.clanId);
    }

    @SubscribeMessage(CLAN_SOCKET_EVENTS.LEAVE_CLAN_CHAT)
    async leaveClanChat(
        @ConnectedSocket() client: ChatSocket,
        @MessageBody() payload: { clanId: string },
    ) {
        console.log("started leaveClanChat");
        await this.cs.leaveClanRoom(client, payload.clanId);
    }

    @SubscribeMessage(CLAN_SOCKET_EVENTS.SEND_CLAN_MSG)
    async sendClanMsg(
        @ConnectedSocket() client: ChatSocket,
        @MessageBody() payload: { message: string },
    ) {
        console.log('sendClanMsg: ', payload.message);
        await this.cs.sendClanMsg(client, payload.message);
    }

}
