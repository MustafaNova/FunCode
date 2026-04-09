import { io, type Socket } from 'socket.io-client';
import { SERVER_URL } from '../constants/urls.ts';
import {
    type LoseRes,
    type SubmitReq,
    type WrongRes,
    type Task,
    type WinRes,
    SOCKET_EVENTS
} from '../../../shared/src';

let socket: Socket | null = null;

export function getSocket(): Socket {
    if (!socket) {
        socket = io(SERVER_URL, { withCredentials: true });
    }
    return socket;
}

export function sendPlayerReady() {
    socket?.emit(SOCKET_EVENTS.PLAYER_READY);
}

export function onBattleStarted(callback: (data: { task: Task }) => void) {
    socket?.on(SOCKET_EVENTS.BATTLE_STARTED, callback);

    return () => {
        socket?.off(SOCKET_EVENTS.BATTLE_STARTED, callback);
    }
}

export function sendCode(submitReq: SubmitReq) {
    socket?.emit(SOCKET_EVENTS.SUBMIT_SOLUTION, submitReq);
}

export function onWrongSubmit(callback: (response: WrongRes) => void) {
    socket?.on(SOCKET_EVENTS.WRONG_SUBMIT, callback);
    return () => {
        socket?.off(SOCKET_EVENTS.WRONG_SUBMIT, callback);
    }
}

export function onWin(callback: (response: WinRes) => void) {
    socket?.on(SOCKET_EVENTS.WIN, callback)
    return () => {
        socket?.off(SOCKET_EVENTS.WIN, callback);
    }
}

export function onLose(callback: (response: LoseRes) => void) {
    socket?.on(SOCKET_EVENTS.LOSE, callback)
    return () => {
        socket?.off(SOCKET_EVENTS.LOSE, callback);
    }
}