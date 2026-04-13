import { Body, Controller, Get, Inject, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    AuthUser,
    UserPayload,
} from '../../../../../common/utils/user-payload.decorator';
import { ActiveScreenReq } from './dtos/activeScreen.req';
import type { ChangeActiveScreenPort } from '../../../../application/ports/inbound/changeActiveScreen.port';
import {
    CHANGE_ACTIVE_SCREEN_PORT,
    GET_ACTIVE_SCREEN_PORT,
} from '../../../../infrastructure/uc-wiring/tokens';
import { ChangeActiveScreenCmd } from '../../../../application/use-cases/changeActiveScreen/changeActiveScreen.cmd';
import type { GetActiveScreenPort } from '../../../../application/ports/inbound/getActiveScreen.port';
import { GetActiveScreenRes } from '@funcode/shared';

@Controller('active-screen')
export class ActiveScreenController {
    constructor(
        @Inject(CHANGE_ACTIVE_SCREEN_PORT)
        private readonly changeACPort: ChangeActiveScreenPort,
        @Inject(GET_ACTIVE_SCREEN_PORT)
        private readonly getACPort: GetActiveScreenPort,
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
        await this.changeACPort.execute(cmd);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getActiveScreen(
        @UserPayload() user: AuthUser,
    ): Promise<GetActiveScreenRes> {
        console.log('request getActiveScreen');
        const res = await this.getACPort.getActiveScreen(user.userId);
        return {
            course: res.course,
            module: res.module,
            unlockedLevel: res.unlockedLevel,
        };
    }
}
