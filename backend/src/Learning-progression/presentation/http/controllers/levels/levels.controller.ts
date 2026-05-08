import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { type GetLevelPort } from '../../../../application/ports/inbound/getLevel.port';
import {
    GET_LEVEL_PORT,
    LEVEL_PROGRESS_PORT,
    VALIDATE_TASK_PORT,
} from '../../../../infrastructure/uc-wiring/tokens';
import { GetLevelCmd } from '../../../../application/use-cases/getLevel/getLevel.cmd';
import {
    Course,
    type GetLevelRes,
    type ValidateLevelTaskReq,
} from '@funcode/shared';
import { LevelAccessGuard } from './levelAccessGuard';
import { GetLevelDto } from './getLevelReq';
import type { ValidateTaskPort } from '../../../../application/ports/inbound/validate.task.port';
import type { ValidateLevelTaskRes } from '@funcode/shared';
import { type LevelProgressionPort } from '../../../../application/ports/inbound/LevelProgression.port';
import {
    AuthUser,
    UserPayload,
} from '../../../../../common/utils/user-payload.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('levels')
export class LevelsController {
    constructor(
        @Inject(GET_LEVEL_PORT)
        private readonly levelService: GetLevelPort,
        @Inject(VALIDATE_TASK_PORT)
        private readonly taskValidation: ValidateTaskPort,
        @Inject(LEVEL_PROGRESS_PORT)
        private readonly levelProgress: LevelProgressionPort,
    ) {}

    @Get(':course/:module/:level')
    @UseGuards(LevelAccessGuard)
    getLevel(@Param() req: GetLevelDto): GetLevelRes {
        console.log('request getLevel');
        const cmd = GetLevelCmd.create(req.course, req.module, req.level);
        const levelContent = this.levelService.execute(cmd);
        return { data: levelContent };
    }

    @Post('submit')
    async validateLevelTask(
        @UserPayload() user: AuthUser,
        @Body() req: ValidateLevelTaskReq,
    ): Promise<ValidateLevelTaskRes> {
        console.log('req validateLevelTask from: ', user.userId);
        const validationRes = await this.taskValidation.validate({
            taskId: req.taskId,
            code: req.code,
        });
        console.log('validationRes in Controller: ', validationRes);
        if (validationRes.res) {
            console.log(`unlockNextLevel for userId: ${user.userId}`);
            await this.levelProgress.unlockNextLevel(
                user.userId,
                req.course as Course,
                req.module,
            );
        }
        return { res: validationRes.res };
    }
}
