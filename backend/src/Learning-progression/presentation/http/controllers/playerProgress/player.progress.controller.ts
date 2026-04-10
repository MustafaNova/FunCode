import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { GET_PLAYER_PROGRESS_PORT } from '../../../../infrastructure/uc-wiring/tokens';
import type { GetPlayerProgressPort } from '../../../../application/ports/inbound/getPlayerProgress.port';
import { AuthGuard } from '@nestjs/passport';
import {
    AuthUser,
    UserPayload,
} from '../../../../../common/utils/user-payload.decorator';
import { ProgressRes } from './res.dto';

@Controller('progress')
export class PlayerProgressController {
    constructor(
        @Inject(GET_PLAYER_PROGRESS_PORT)
        private readonly playerProgressPort: GetPlayerProgressPort,
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getProgress(@UserPayload() user: AuthUser): Promise<ProgressRes> {
        const res = await this.playerProgressPort.getPlayerProgress(
            user.userId,
        );

        return {
            unlockedLevel: res.unlockedLevel,
            course: res.course,
            module: res.module,
        };
    }
}
