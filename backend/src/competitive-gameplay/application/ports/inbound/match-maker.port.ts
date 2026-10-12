import { ArenaGameModeId } from '@funcode/shared';

export interface MatchMakerPort {
    tryMatch(gameModeId: ArenaGameModeId): Promise<void>;
}
