import { Controller, Post, Inject, UseGuards, Body } from '@nestjs/common';
import type { JoinMatchMakingPort } from '../../../../application/ports/inbound/join-matchmaking.port';
import { JOIN_MATCHMAKING_PORT, LEAVE_MATCHMAKING_PORT } from '../../../../infrastructure/uc-wiring/tokens';
import { AuthGuard } from '@nestjs/passport';
import {
    AuthUser,
    UserPayload,
} from '../../../../../common/utils/user-payload.decorator';
import { MatchMakingPayload } from './dtos/join.request';
import { JoinCmd } from '../../../../application/use-cases/matchmaking-join/dtos/join.cmd';
import { LeaveCmd } from '../../../../application/use-cases/matchmaking-leave/leave.cmd';
import { type LeaveMatchmakingPort } from '../../../../application/ports/inbound/leave-matchmaking.port';

@UseGuards(AuthGuard('jwt'))
@Controller('matchmaking')
export class MatchmakingController {
    constructor(
        @Inject(JOIN_MATCHMAKING_PORT)
        private readonly joinMatchMaking: JoinMatchMakingPort,
        @Inject(LEAVE_MATCHMAKING_PORT)
        private readonly leaveMatchMaking: LeaveMatchmakingPort,
    ) {}

    @Post('join')
    async join(@UserPayload() user: AuthUser, @Body() payload: MatchMakingPayload) {
        console.log('NEW PLAYER JOINED QUEUE');
        const cmd = JoinCmd.create(
            user.userId,
            user.username,
            payload.matchType,
            payload.playerCount,
        );
        await this.joinMatchMaking.join(cmd);
        return { success: true };
    }

    @Post('leave')
    async leave(@UserPayload() user: AuthUser, @Body() payload: MatchMakingPayload) {
        console.log(`${user.username} LEAVES QUEUE`);
        const cmd = LeaveCmd.create(
            user.userId,
            user.username,
            payload.matchType,
            payload.playerCount,
        )
        await this.leaveMatchMaking.leave(cmd);
        return { success: true };
    }
}
