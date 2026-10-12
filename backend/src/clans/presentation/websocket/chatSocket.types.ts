import { Socket } from 'socket.io';

export type JwtPayload = {
    userId: string;
    username: string;
    iat: number;
    exp: number;
}

export type ChatSocket = Socket & {
    data: {
        user: JwtPayload;
        clanId?: string;
    };
};