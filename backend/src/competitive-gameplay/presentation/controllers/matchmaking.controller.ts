import { Req, Controller, Post, Inject } from '@nestjs/common';
import type { JoinMatchMakingPort } from '../../application/ports/inbound/join-matchmaking.port';
import { JOIN_MATCHMAKING_SERVICE } from '../../application/tokens';
import type { JwtRequest } from '../../../auth/jwt-request.type';

@Controller('matchmaking')
export class MatchmakingController {
    constructor(
        @Inject(JOIN_MATCHMAKING_SERVICE)
        private readonly joinMatchMaking: JoinMatchMakingPort,
    ) {}

    @Post('join')
    async join(@Req() req: JwtRequest) {
        // await this.joinMatchMaking.join(req.user.sub);
    }
}
