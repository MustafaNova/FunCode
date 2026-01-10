import { User } from '../../../domain/entities/user';

export interface MatchmakingQueuePort {
    enqueue(user: User): Promise<void>;
}
