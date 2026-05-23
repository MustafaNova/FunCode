import { Body, Controller, Get, Inject, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    AuthUser,
    UserPayload,
} from '../../../../../common/utils/user-payload.decorator';
import { StartCourseReq } from './dtos/startCourse.req';
import {
    GET_ACTIVE_SCREEN_PORT, START_COURSE_PORT,
} from '../../../../infrastructure/uc-wiring/tokens';
import type { GetActiveScreenPort } from '../../../../application/ports/inbound/getActiveScreen.port';
import { GetActiveScreenRes } from '@funcode/shared';
import { type StartCoursePort } from '../../../../application/ports/inbound/startCourse.port';
import { StartCourseCmd } from '../../../../application/use-cases/startCourse/startCourse.cmd';

@UseGuards(AuthGuard('jwt'))
@Controller('active-screen')
export class ActiveScreenController {
    constructor(
        @Inject(START_COURSE_PORT)
        private readonly startCoursePort: StartCoursePort,
        @Inject(GET_ACTIVE_SCREEN_PORT)
        private readonly getACPort: GetActiveScreenPort,
    ) {}

    @Put('start-course')
    async startCourse(
        @UserPayload() user: AuthUser,
        @Body() body: StartCourseReq,
    ) {
        console.log('request active-screen/start-course')
        const cmd = StartCourseCmd.create(
            user.userId,
            body.course,
        );
        await this.startCoursePort.execute(cmd);
    }

    @Get()
    async getActiveScreen(
        @UserPayload() user: AuthUser,
    ): Promise<GetActiveScreenRes> {
        const res = await this.getACPort.getActiveScreen(user.userId);
        return {
            course: res.course,
            module: res.module,
            unlockedLevel: res.unlockedLevel,
        };
    }
}
