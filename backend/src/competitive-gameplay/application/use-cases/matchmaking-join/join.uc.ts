import { JoinMatchMakingPort } from '../../ports/inbound/join-matchmaking.port';
import type { MatchmakingQueuePort } from '../../ports/outbound/matchmaking-queue.port';
import { JoinCmd } from './dtos/join.cmd';
import { JoinRes } from './dtos/join.res';
import { QueueEntry } from '../../../domain/entities/queueEntry';

export class JoinUC implements JoinMatchMakingPort {
    constructor(private readonly matchmakingQueuePort: MatchmakingQueuePort) {}

    async join(joinCmd: JoinCmd): Promise<JoinRes> {
        const queueEntry = QueueEntry.create(joinCmd.userId, joinCmd.username);
        await this.matchmakingQueuePort.enqueue(
            queueEntry,
            joinCmd.matchType,
            joinCmd.playerCount,
        );
        return JoinRes.ok();
    }
}
