import { io, type Socket } from 'socket.io-client';
import {
    type LoseRes,
    type SubmitReq,
    type SubmitResponse,
    type TaskDto,
    type WinRes,
    SOCKET_EVENTS, type ErrorResponse,
} from '@funcode/shared';
import { me } from '../auth.ts';

let gameSocket: Socket | null = null;
const SOCKET_URL = `${import.meta.env.VITE_SERVER_URL}/game`;

export async function getSocket(): Promise<Socket> {
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

export async function socketDisconnect() {
    gameSocket?.disconnect();
    gameSocket = null;
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

export function onError(callback: (response: ErrorResponse) => void) {
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
