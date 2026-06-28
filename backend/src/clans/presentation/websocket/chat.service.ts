import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { type ClanRepositoryPort } from '../../application/ports/outbound/clan.repository.port';
import { CLAN_REPO_PORT } from '../../infrastructure/clanRepo/tokens';
import { ChatSocket, JwtPayload } from './chatSocket.types';
import { CLAN_SOCKET_EVENTS, ClanMsg } from '@funcode/shared';
import { type ClanChatRepositoryPort } from '../../application/ports/outbound/clanChat.repository.port';
import { CLAN_CHAT_REPO_PORT } from '../../infrastructure/clanChatRepo/tokens';

@Injectable()
export class ChatService {
    server: Server

    constructor(
        @Inject(CLAN_REPO_PORT)
        private readonly clanRepo: ClanRepositoryPort,
        @Inject(CLAN_CHAT_REPO_PORT)
        private readonly clanChatRepo: ClanChatRepositoryPort,
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

    async leaveClanRoom(client: ChatSocket) {
        const clanId = client.data.clanId;
        if (!clanId) return;

        await client.leave(clanId);
        delete client.data.clanId;
    }

    async sendClanMsg(client: ChatSocket, msg: string) {
        const clanId = client.data.clanId;
        const userId = client.data.user.userId;
        const username = client.data.user.username;
        const clanRole = await this.clanRepo.getUserClanRole(client.data.user.userId);

        if (!msg.trim() || !clanId || !clanRole) {
            console.log("sendClanMsg not working:", !msg.trim(), !clanId);
            return;
        }

        const savedMsg = await this.clanChatRepo.saveMessage({
            clanId,
            userId,
            message: msg
        })

        const clanMsg: ClanMsg = {
            messageId: savedMsg.messageId,
            msg,
            clanRole,
            username,
            createdAt: savedMsg.createdAt.toISOString(),
        }
        this.server.to(clanId).emit(CLAN_SOCKET_EVENTS.NEW_CLAN_MSG, clanMsg);
    }

}
