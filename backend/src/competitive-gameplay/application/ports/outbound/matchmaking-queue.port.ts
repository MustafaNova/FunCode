import { QueueEntry } from '../../../domain/entities/queueEntry';
import { MatchType } from '../../../domain/enums/matchtype';
import { PlayerCount } from '../../../domain/enums/playercount';
import { ArenaGameModeId } from '@funcode/shared';

export interface MatchmakingQueuePort {
    enqueue(
        queueEntry: QueueEntry,
        gameModeId: ArenaGameModeId
    ): Promise<void>;
    remove(
        queueEntry: QueueEntry,
        gameModeId: ArenaGameModeId
    ): Promise<void>;
    getEntryCount(gameModeId: ArenaGameModeId): Promise<number>;
    popTwoPlayers(gameModeId: ArenaGameModeId): Promise<QueueEntry[]>;
    tryPopTwoPlayers(gameModeId: ArenaGameModeId): Promise<[QueueEntry, QueueEntry] | null>
}
