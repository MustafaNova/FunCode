import { JoinMatchMakingPort } from '../../ports/inbound/join-matchmaking.port';
import type { MatchmakingQueuePort } from '../../ports/outbound/matchmaking-queue.port';
import { JoinCmd } from './dtos/join.cmd';
import { JoinRes } from './dtos/join.res';
import { QueueEntry } from '../../../domain/entities/queueEntry';
import { MatchMakerPort } from '../../ports/inbound/match-maker.port';

export class JoinUC implements JoinMatchMakingPort {
    constructor(
        private readonly matchmakingQueuePort: MatchmakingQueuePort,
        private readonly matchMaker: MatchMakerPort,
    ) {}

    async join(joinCmd: JoinCmd): Promise<JoinRes> {
        const queueEntry = QueueEntry.create(joinCmd.userId, joinCmd.username);
        await this.matchmakingQueuePort.enqueue(
            queueEntry,
            joinCmd.gameModeId
        );
        await this.matchMaker.tryMatch(joinCmd.gameModeId);
        return JoinRes.ok();
    }
}
