import { Controller, Post, Inject, UseGuards, Body } from '@nestjs/common';
import type { JoinMatchMakingPort } from '../../../../application/ports/inbound/join-matchmaking.port';
import { JOIN_MATCHMAKING_PORT } from '../../../../application/tokens';
import { AuthGuard } from '@nestjs/passport';
import { UserPayload } from '../../decorators/user-payload.decorator';
import { AuthUser, JoinPayload } from './dtos/join.request';
import { JoinCmd } from '../../../../application/use-cases/matchmaking-join/dtos/join.cmd';

@Controller('matchmaking')
export class MatchmakingController {
    constructor(
        @Inject(JOIN_MATCHMAKING_PORT)
        private readonly joinMatchMaking: JoinMatchMakingPort,
    ) {}

    @Post('join')
    @UseGuards(AuthGuard('jwt'))
    async join(@UserPayload() user: AuthUser, @Body() payload: JoinPayload) {
        const cmd = JoinCmd.create(
            user.userId,
            user.username,
            payload.matchType,
            payload.playerCount,
        );
        await this.joinMatchMaking.join(cmd);
        return { success: true };
    }
}
