import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { type ClanRepositoryPort } from '../../application/ports/outbound/clan.repository.port';
import { CLAN_REPO_PORT } from '../../infrastructure/clanRepository/tokens';
import { ChatSocket, JwtPayload } from './chatSocket.types';
import { CLAN_SOCKET_EVENTS, ClanMsg } from '@funcode/shared';

@Injectable()
export class ChatService {
    server: Server

    constructor(
        @Inject(CLAN_REPO_PORT)
        private readonly clanRepo: ClanRepositoryPort,
    ) {}

    setServer(server: Server) {
        this.server = server;
    }

    authenticateClient(client: Socket) {
        const token = client.handshake.auth.token;
        if (!token) {
            client.disconnect();
            return;
        }
        try {
            client.data.user = verify(token, 'test') as JwtPayload;
            console.log('token verified correctly');
        } catch {
            client.disconnect();
        }
    }

    async joinClanRoom(client: ChatSocket, clanId: string) {
        const res = await this.clanRepo.isUserInClanByClanId(client.data.user.userId, clanId);
        if (!res) return;
        client.data.clanId = clanId;
        await client.join(clanId);
    }

    async leaveClanRoom(client: ChatSocket, clanId: string) {
        delete client.data.clanId;
        await client.leave(clanId);
    }

    async sendClanMsg(client: ChatSocket, msg: string) {
        const clanId = client.data.clanId;
        if (!msg.trim() || !clanId) {
            console.log("sendClanMsg not working:", !msg.trim(), !clanId);
            return;
        }

        const clanMsg: ClanMsg = {
            msg,
            createdAt: new Date().toDateString(),
        }
        this.server.to(clanId).emit(CLAN_SOCKET_EVENTS.NEW_CLAN_MSG, clanMsg);
        console.log("sendClanMsg sended to clan");
    }

}
