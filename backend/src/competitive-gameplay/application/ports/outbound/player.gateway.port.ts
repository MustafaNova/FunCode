import { SOCKET_EVENTS } from '@funcode/shared';

export interface PlayerGatewayPort {
    joinPlayersToRoom1v1(
        roomId: string,
        userId1: string,
        userId2: string,
    ): Promise<void>;
    closeRoom(roomId: string): Promise<void>;
    notifyRoom<T>(roomId: string, event: SOCKET_EVENTS, payload?: T): void;
    notifyPlayer<T>(userId: string, event: SOCKET_EVENTS, payload?: T): void;
}
