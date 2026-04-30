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
import { GET_LEVEL_PORT } from '../../../../infrastructure/uc-wiring/tokens';
import { GetLevelCmd } from '../../../../application/use-cases/getLevel/getLevel.cmd';
import type { GetLevelRes, ValidateLevelTaskReq } from '@funcode/shared';
import { LevelAccessGuard } from './levelAccessGuard';
import { GetLevelDto } from './getLevelReq';

@UseGuards(AuthGuard('jwt'))
@Controller('levels')
export class LevelsController {
    constructor(
        @Inject(GET_LEVEL_PORT)
        private readonly levelService: GetLevelPort,
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
    validateLevelTask(@Body() req: ValidateLevelTaskReq) {
        console.log('request validateLevelTask', req.taskId, req.code);
    }
}
