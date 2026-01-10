import { Controller, Post, Inject } from '@nestjs/common';
import { JoinMatchMakingUC } from '../../application/ports/inbound/join-matchmaking.port';
import { JoinMatchmakingService } from '../../application/use-cases/join-matchmaking.service';

@Controller('matchmaking')
export class MatchmakingController {
    constructor(
        @Inject(JoinMatchmakingService)
        joinMatchMaking: joinMatchmakingPort.JoinMatchMakingUC,
    ) {}

    @Post('join')
    join() {
        return true;
    }
}
