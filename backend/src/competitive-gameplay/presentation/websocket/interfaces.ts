import { Socket } from 'socket.io';
import { LosePayload, WinPayload } from '../../domain/value-objects/payloads';

export interface Payload {
    userId: string;
    username: string;
    iat: number;
    exp: number;
}

export interface GameSocket extends Socket {
    data: {
        user: Payload;
        room?: string;
        roomSize?: number;
    };
}

export interface RoomSocket extends GameSocket {
    data: GameSocket['data'] & {
        room: string;
        roomSize: number;
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

export interface ErrorEvent {
    userId: string;
    code: number;
    msg: string;
}

export interface WinEvent {
    userId: string;
    payload: WinPayload;
}

export interface LoseEvent {
    userId: string;
    payload: LosePayload;
}
