import { Socket } from 'socket.io';

export interface Payload {
    userId: string;
    username: string;
    iat: number;
    exp: number;
}

export interface AuthenticatedSocket extends Socket {
    data: {
        user?: Payload;
        room?: string;
    };
}
