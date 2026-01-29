import { Controller, Post, Inject, UseGuards } from '@nestjs/common';
import type { JoinMatchMakingPort } from '../../../../application/ports/inbound/join-matchmaking.port';
import { JOIN_MATCHMAKING_SERVICE } from '../../../../application/tokens';
import { AuthGuard } from '@nestjs/passport';
import { UserPayload } from '../../decorators/user-payload.decorator';
import { JoinRequest } from './dtos/join.request';
import { JoinCmd } from '../../../../application/use-cases/matchmaking-join/dtos/join.cmd';

@Controller('matchmaking')
export class MatchmakingController {
    constructor(
        @Inject(JOIN_MATCHMAKING_SERVICE)
        private readonly joinMatchMaking: JoinMatchMakingPort,
    ) {}

    @Post('join')
    @UseGuards(AuthGuard('jwt'))
    async join(@UserPayload() req: JoinRequest) {
        const cmd = JoinCmd.create(req.userId, req.username);
        await this.joinMatchMaking.join(cmd);
        return { success: true };
    }
}
