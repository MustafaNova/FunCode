import { QueueEntry } from '../../../domain/entities/queueEntry';

export interface MatchmakingQueuePort {
    enqueue(queueEntry: QueueEntry): Promise<void>;
}
