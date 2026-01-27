import { Controller, Post, Inject, Body } from '@nestjs/common';
import type { JoinMatchMakingPort } from '../../../application/ports/inbound/join-matchmaking.port';
import { JOIN_MATCHMAKING_SERVICE } from '../../../application/tokens';

@Controller('matchmaking')
export class MatchmakingController {
    constructor(
        @Inject(JOIN_MATCHMAKING_SERVICE)
        private readonly joinMatchMaking: JoinMatchMakingPort,
    ) {}

    @Post('join')
    join(@Body() req) {
        return true;
        // await this.joinMatchMaking.join(req.user.sub);
    }
}
