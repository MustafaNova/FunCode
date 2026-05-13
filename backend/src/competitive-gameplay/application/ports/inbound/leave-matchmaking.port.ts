import { LeaveCmd } from '../../use-cases/matchmaking-leave/leave.cmd';

export interface LeaveMatchmakingPort {
    leave(leaveCmd: LeaveCmd): Promise<void>;
}
