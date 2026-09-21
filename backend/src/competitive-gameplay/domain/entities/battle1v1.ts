import { ArenaGameModeId } from '@funcode/shared';

export interface PlayerInfo {
    userId: string;
    username: string;
}

export type Battle1v1 = {
    player1: PlayerInfo,
    player2: PlayerInfo,
    roomId: string,
    gameModeId: ArenaGameModeId
}
