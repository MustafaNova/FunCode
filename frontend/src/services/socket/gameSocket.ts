import { io, type Socket } from 'socket.io-client';
import {
    type LoseRes,
    type SubmitPayload,
    type SubmitResponse,
    type WinRes,
    SOCKET_EVENTS,
    type JoinMatchmakingPayload,
    type LeaveMatchmakingPayload,
    type BattleAbortedPayload,
    type CodeGolfScoreUpdatedPayload, type BattleStartedPayload, type CodeGolfWinPayload, type CodeGolfLosePayload,
    type CodeGolfWrongSubmitPayload, type MatchMessagePayload,
} from '@funcode/shared';
import { me } from '../http/auth.ts';
import type {
    CodeGolfActivityPayload
} from '@funcode/shared/dist/competitive-gameplay/payloads/codeGolf.activity.payload.ts';

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

export function onBattleStarted(callback: (data: BattleStartedPayload) => void) {
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

export function sendCodeGolfActivity(payload: CodeGolfActivityPayload) {
    gameSocket?.emit(SOCKET_EVENTS.CODE_GOLF_ACTIVITY, payload);
}

export function onCodeGolfOpponentActivity(callback: (payload: CodeGolfActivityPayload) => void) {
    gameSocket?.on(SOCKET_EVENTS.CODE_GOLF_OPPONENT_ACTIVITY, callback);
    return () => {
        gameSocket?.off(SOCKET_EVENTS.CODE_GOLF_OPPONENT_ACTIVITY, callback);
    }
}

export function onWrongSubmit(callback: (response: SubmitResponse) => void) {
    gameSocket?.on(SOCKET_EVENTS.WRONG_SUBMIT, callback);
    return () => {
        gameSocket?.off(SOCKET_EVENTS.WRONG_SUBMIT, callback);
    }
}

export function onCodeGolfWrongSubmit(callback: (response: CodeGolfWrongSubmitPayload) => void) {
    gameSocket?.on(SOCKET_EVENTS.CODE_GOLF_WRONG_SUBMIT, callback);
    return () => {
        gameSocket?.off(SOCKET_EVENTS.CODE_GOLF_WRONG_SUBMIT, callback);
    }
}

export function onError(callback: (response: SubmitResponse) => void) {
    gameSocket?.on(SOCKET_EVENTS.ERROR, callback);
    return () => {
        gameSocket?.off(SOCKET_EVENTS.ERROR, callback);
    }
}

export function onWin(callback: (response: WinRes) => void) {
    gameSocket?.on(SOCKET_EVENTS.WIN, callback);
    return () => {
        gameSocket?.off(SOCKET_EVENTS.WIN, callback);
    }
}

export function onCodeGolfWin(callback: (response: CodeGolfWinPayload) => void) {
    gameSocket?.on(SOCKET_EVENTS.CODE_GOLF_WIN, callback);
    return () => {
        gameSocket?.off(SOCKET_EVENTS.CODE_GOLF_WIN, callback);
    }
}

export function onCodeGolfLose(callback: (response: CodeGolfLosePayload) => void) {
    gameSocket?.on(SOCKET_EVENTS.CODE_GOLF_LOSE, callback);
    return () => {
        gameSocket?.off(SOCKET_EVENTS.CODE_GOLF_LOSE, callback);
    }
}


export function onDraw(callback: () => void) {
    gameSocket?.on(SOCKET_EVENTS.DRAW, callback)
    return () => {
        gameSocket?.off(SOCKET_EVENTS.DRAW, callback);
    }
}

export function onLose(callback: (response: LoseRes) => void) {
    gameSocket?.on(SOCKET_EVENTS.LOSE, callback)
    return () => {
        gameSocket?.off(SOCKET_EVENTS.LOSE, callback);
    }
}

export function onCodeGolfBestScoreUpdated(callback: (payload: CodeGolfScoreUpdatedPayload) => void) {
    gameSocket?.on(SOCKET_EVENTS.CODE_GOLF_SCORE_UPDATED, callback);
    return () => {
        gameSocket?.off(SOCKET_EVENTS.CODE_GOLF_SCORE_UPDATED, callback);
    }
}

export function onOpponentIsSubmitting(callback: () => void) {
    gameSocket?.on(SOCKET_EVENTS.CODE_GOLF_OPPONENT_SUBMITTED, callback);
    return () => {
        gameSocket?.off(SOCKET_EVENTS.CODE_GOLF_OPPONENT_SUBMITTED, callback);
    }
}

export function sendMatchMessage(payload: MatchMessagePayload) {
    gameSocket?.emit(SOCKET_EVENTS.MATCH_MESSAGE, payload);
}

export function onOpponentMatchMessage(callback: (payload: MatchMessagePayload) => void) {
    gameSocket?.on(SOCKET_EVENTS.OPPONENT_MATCH_MESSAGE, callback);
    return () => {
        gameSocket?.off(SOCKET_EVENTS.OPPONENT_MATCH_MESSAGE, callback);
    }
}