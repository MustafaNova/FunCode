import { Inject, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { type ClanRepositoryPort } from '../../application/ports/outbound/clan.repository.port';
import { CLAN_REPO_PORT } from '../../infrastructure/clanRepository/tokens';

type JwtPayload = {
    userId: string;
    username: string;
    iat: number;
    exp: number;
}

export type ChatSocket = Socket & {
    data: {
        user: JwtPayload;
    };
};

@Injectable()
export class ChatService {

    constructor(
        @Inject(CLAN_REPO_PORT)
        private readonly clanRepo: ClanRepositoryPort,
    ) {}

    authenticateClient(client: Socket, token: string | undefined) {
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
        await client.join(clanId);
    }

    async leaveClanRoom(client: ChatSocket, clanId: string) {
        await client.leave(clanId);
    }

}