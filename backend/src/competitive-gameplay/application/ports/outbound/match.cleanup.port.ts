import { ArenaGameModeId } from '@funcode/shared';

export interface MatchCleanupPort {
    cleanup(roomId: string, gameModeId: ArenaGameModeId): Promise<void>;
}