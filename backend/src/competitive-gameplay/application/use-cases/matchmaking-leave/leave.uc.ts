import { LeaveMatchmakingPort } from '../../ports/inbound/leave-matchmaking.port';
import { LeaveCmd } from './leave.cmd';
import { MatchmakingQueuePort } from '../../ports/outbound/matchmaking-queue.port';
import { QueueEntry } from '../../../domain/entities/queueEntry';


export class LeaveUC implements LeaveMatchmakingPort {
    constructor(private readonly matchmakingQueuePort: MatchmakingQueuePort ) {}

    async leave(leaveCmd: LeaveCmd): Promise<void> {
        const queueEntry = QueueEntry.create(leaveCmd.userId, leaveCmd.username);

        await this.matchmakingQueuePort.remove(
            queueEntry,
            leaveCmd.matchType,
            leaveCmd.playerCount,
        );
    }
}