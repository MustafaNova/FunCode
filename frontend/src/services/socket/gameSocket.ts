import { io, type Socket } from 'socket.io-client';
import {
    type LoseRes,
    type SubmitReq,
    type SubmitResponse,
    type TaskDto,
    type WinRes,
    SOCKET_EVENTS, type ErrorResponse, type JoinMatchmakingReq, type LeaveMatchmakingReq,
} from '@funcode/shared';
import { me } from '../http/auth.ts';

let gameSocket: Socket | null = null;
const SOCKET_URL = `${import.meta.env.VITE_SERVER_URL}/game`;

export async function getGameSocket(): Promise<Socket> {
    if (!gameSocket) {
        const meRes = await me();
        gameSocket = io(SOCKET_URL, {
            auth: {
                token: meRes.token
            }
        });
    }
    return gameSocket;
}


export async function joinMatchmaking(handleMatchFound: () => void, payload: JoinMatchmakingReq) {
    const socket = await getGameSocket();
    socket.off(SOCKET_EVENTS.MATCH_FOUND);
    socket.once(SOCKET_EVENTS.MATCH_FOUND, handleMatchFound);
    socket.emit(SOCKET_EVENTS.JOIN_MATCHMAKING, payload);
}

export async function leaveMatchmaking(payload: LeaveMatchmakingReq) {
    const socket = await getGameSocket();
    socket.emit(SOCKET_EVENTS.LEAVE_MATCHMAKING, payload);
}

export function sendPlayerReady() {
    gameSocket?.emit(SOCKET_EVENTS.PLAYER_READY);
}

export function onBattleStarted(callback: (data: { task: TaskDto }) => void) {
    gameSocket?.on(SOCKET_EVENTS.BATTLE_STARTED, callback);

    return () => {
        gameSocket?.off(SOCKET_EVENTS.BATTLE_STARTED, callback);
    }
}

export function sendCode(submitReq: SubmitReq) {
    gameSocket?.emit(SOCKET_EVENTS.SUBMIT_SOLUTION, submitReq);
}

export function onWrongSubmit(callback: (response: SubmitResponse) => void) {
    gameSocket?.on(SOCKET_EVENTS.WRONG_SUBMIT, callback);
    return () => {
        gameSocket?.off(SOCKET_EVENTS.WRONG_SUBMIT, callback);
    }
}

export function onError(callback: (response: SubmitResponse) => void) {
    gameSocket?.on(SOCKET_EVENTS.ERROR, callback);
    return () => {
        gameSocket?.off(SOCKET_EVENTS.ERROR, callback);
    }
}

export function onWin(callback: (response: WinRes) => void) {
    gameSocket?.on(SOCKET_EVENTS.WIN, callback)
    return () => {
        gameSocket?.off(SOCKET_EVENTS.WIN, callback);
    }
}

export function onLose(callback: (response: LoseRes) => void) {
    gameSocket?.on(SOCKET_EVENTS.LOSE, callback)
    return () => {
        gameSocket?.off(SOCKET_EVENTS.LOSE, callback);
    }
}
