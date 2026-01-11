import { Req, Controller, Post, Inject, UseGuards } from '@nestjs/common';
import type { JoinMatchMakingUC } from '../../application/ports/inbound/join-matchmaking.port';
import { JOIN_MATCHMAKING_SERVICE } from '../../application/tokens';
import { AuthGuard } from '@nestjs/passport';
import type { JwtRequest } from '../../../auth/jwt-request.type';

@Controller('matchmaking')
export class MatchmakingController {
    constructor(
        @Inject(JOIN_MATCHMAKING_SERVICE)
        private readonly joinMatchMaking: JoinMatchMakingUC,
    ) {}

    @Post('join')
    @UseGuards(AuthGuard('jwt'))
    async join(@Req() req: JwtRequest) {
        await this.joinMatchMaking.join(req.user.sub);
    }
}
