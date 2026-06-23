import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway
} from '@nestjs/websockets';
import { UseFilters } from '@nestjs/common';
import { WsExceptionFilter } from '../../../common/ws.exception.filter';
import { ChatService, type ChatSocket } from './chat.service';
import { Socket } from 'socket.io';


@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
    namespace: '/chat',
    cors: {
        origin: process.env['FRONTEND_URL'],
        credentials: true,
    },
})
export class ChatGateway
    implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private readonly cs: ChatService
    ) {}

    handleConnection(client: Socket): any {
        console.log('ChatGateway.handleConnection');
        this.cs.authenticateClient(client, client.handshake.auth.token);
    }

    handleDisconnect(client: any): any {
        console.log('ChatGateway disconnection');
    }

    @SubscribeMessage('JOIN_CLAN_CHAT')
    async joinClanChat(
        client: ChatSocket,
        @MessageBody() payload: { clanId: string },
    ) {
        await this.cs.joinClanRoom(client, payload.clanId);
    }

    @SubscribeMessage('LEAVE_CLAN_CHAT')
    async leaveClanChat(
        client: ChatSocket,
        @MessageBody() payload: { clanId: string },
    ) {
        await this.cs.leaveClanRoom(client, payload.clanId);
    }

}
