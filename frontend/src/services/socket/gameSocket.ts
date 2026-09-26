import { io, type Socket } from 'socket.io-client';
import {
    type LoseRes,
    type SubmitPayload,
    type SubmitResponse,
    type WinRes,
    SOCKET_EVENTS, type JoinMatchmakingPayload, type LeaveMatchmakingPayload, type ArenaTask, type BattleAbortedPayload,
    type CodeGolfSubmitRes,
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


export async function joinMatchmaking(handleMatchFound: () => void, payload: JoinMatchmakingPayload) {
    const socket = await getGameSocket();
    socket.off(SOCKET_EVENTS.MATCH_FOUND);
    socket.once(SOCKET_EVENTS.MATCH_FOUND, handleMatchFound);
    socket.emit(SOCKET_EVENTS.JOIN_MATCHMAKING, payload);
}

export async function leaveMatchmaking(payload: LeaveMatchmakingPayload) {
    const socket = await getGameSocket();
    socket.emit(SOCKET_EVENTS.LEAVE_MATCHMAKING, payload);
}

export function sendPlayerReady() {
    gameSocket?.emit(SOCKET_EVENTS.PLAYER_READY);
}

export function onBattleStarted(callback: (data: { task: ArenaTask }) => void) {
    gameSocket?.on(SOCKET_EVENTS.BATTLE_STARTED, callback);

    return () => {
        gameSocket?.off(SOCKET_EVENTS.BATTLE_STARTED, callback);
    }
}

export function onBattleAborted(callback: (payload: BattleAbortedPayload) => void) {
    gameSocket?.on(SOCKET_EVENTS.BATTLE_ABORTED, callback);

    return () => {
        gameSocket?.off(SOCKET_EVENTS.BATTLE_ABORTED, callback);
    }
}

export function sendCode(submitReq: SubmitPayload) {
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

export function onCodeGolfSubmitRes(callback: (response: CodeGolfSubmitRes) => void) {
    gameSocket?.on(
        SOCKET_EVENTS.CODE_GOLF_SUBMIT_RESULT,
        callback,
    );

    return () => {
        gameSocket?.off(
            SOCKET_EVENTS.CODE_GOLF_SUBMIT_RESULT,
            callback,
        );
    };
}
