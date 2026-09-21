import { QueueEntry } from '../../../domain/entities/queueEntry';
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
    tryPopPlayers(gameModeId: ArenaGameModeId, count: number): Promise<QueueEntry[] | null>
}
