import {
    Controller,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { type GetLevelPort } from '../../../../application/ports/inbound/getLevel.port';
import { GET_LEVEL_PORT } from '../../../../infrastructure/uc-wiring/tokens';
import { GetLevelCmd } from '../../../../application/use-cases/getLevel/getLevel.cmd';
import { Course, type GetLevelRes } from '@funcode/shared';
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
}
