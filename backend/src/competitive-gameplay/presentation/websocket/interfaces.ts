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

export interface CreateNewRoom1v1Event {
    roomId: string;
    userId1: string;
    userId2: string;
}

export interface NotifyRoomEvent {
    roomId: string;
    event: string;
    msg: string;
}

export interface SolutionSubmit {
    solution: string;
}
