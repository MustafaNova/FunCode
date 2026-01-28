import { Controller, Post, Inject, Body, UseGuards } from '@nestjs/common';
import type { JoinMatchMakingPort } from '../../../application/ports/inbound/join-matchmaking.port';
import { JOIN_MATCHMAKING_SERVICE } from '../../../application/tokens';
import { AuthGuard } from '@nestjs/passport';

@Controller('matchmaking')
export class MatchmakingController {
    constructor(
        @Inject(JOIN_MATCHMAKING_SERVICE)
        private readonly joinMatchMaking: JoinMatchMakingPort,
    ) {}

    @Post('join')
    @UseGuards(AuthGuard('jwt'))
    join() {
        return true;
        // await this.joinMatchMaking.join(req.user.sub);
    }
}
