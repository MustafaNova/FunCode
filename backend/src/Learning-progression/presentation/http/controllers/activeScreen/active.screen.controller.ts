import { Body, Controller, Inject, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    AuthUser,
    UserPayload,
} from '../../../../../common/utils/user-payload.decorator';
import { ActiveScreenReq } from './activeScreen.req';
import type { ChangeActiveScreenPort } from '../../../../application/ports/inbound/changeActiveScreen.port';
import { CHANGE_ACTIVE_SCREEN_PORT } from '../../../../infrastructure/uc-wiring/tokens';
import { ChangeActiveScreenCmd } from '../../../../application/use-cases/changeActiveScreen/changeActiveScreen.cmd';

@Controller('active-screen')
export class ActiveScreenController {
    constructor(
        @Inject(CHANGE_ACTIVE_SCREEN_PORT)
        private readonly activeScreenPort: ChangeActiveScreenPort,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Put()
    async setActiveScreen(
        @UserPayload() user: AuthUser,
        @Body() body: ActiveScreenReq,
    ) {
        const cmd = ChangeActiveScreenCmd.create(
            user.userId,
            body.course,
            body.module,
        );
        await this.activeScreenPort.execute(cmd);
    }
}
