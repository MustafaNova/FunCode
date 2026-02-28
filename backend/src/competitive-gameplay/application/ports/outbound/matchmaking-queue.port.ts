import { QueueEntry } from '../../../domain/entities/queueEntry';
import { MatchType } from '../../../domain/enums/matchtype';
import { PlayerCount } from '../../../domain/enums/playercount';

export interface MatchmakingQueuePort {
    enqueue(
        queueEntry: QueueEntry,
        type: MatchType,
        players: PlayerCount,
    ): Promise<void>;
    getEntryCount(type: MatchType, players: PlayerCount): Promise<number>;
    popTwoPlayers(type: MatchType, players: PlayerCount): Promise<QueueEntry[]>;
}
