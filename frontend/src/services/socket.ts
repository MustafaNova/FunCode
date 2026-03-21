import { io, type Socket } from 'socket.io-client';
import { SERVER_URL } from '../constants/urls.ts';
import { SOCKET_EVENTS } from '../constants/socketEvents.ts';


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

export function onBattleStarted(callback: () => void) {
    socket?.on(SOCKET_EVENTS.BATTLE_STARTED, callback);

    return () => {
        socket?.off(SOCKET_EVENTS.BATTLE_STARTED, callback);
    }
}
