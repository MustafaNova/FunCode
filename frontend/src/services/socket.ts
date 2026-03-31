import { io, type Socket } from 'socket.io-client';
import { SERVER_URL } from '../constants/urls.ts';
import { SOCKET_EVENTS } from '../constants/socketEvents.ts';
import type { Task } from '../../../shared/src/types.shared.ts';
import { createSubmissionPayload } from '../utils/payloadBuilder.ts';


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

export function sendCode(taskId: string, solution: string) {
    socket?.emit(SOCKET_EVENTS.SUBMIT_SOLUTION, createSubmissionPayload(taskId, solution));
}

export function onWrongSubmit(callback: (response) => void) {
    socket?.on(SOCKET_EVENTS.WRONG_SUBMIT, callback);
    return () => {
        socket?.off(SOCKET_EVENTS.WRONG_SUBMIT, callback);
    }
}