import {
    Controller,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { GetLevelPort } from '../../../../application/ports/inbound/getLevel.port';
import { GET_LEVEL_PORT } from '../../../../infrastructure/uc-wiring/tokens';
import { GetLevelCmd } from '../../../../application/use-cases/getLevel/getLevel.cmd';
import { Course } from '@funcode/shared';

@UseGuards(AuthGuard('jwt'))
@Controller('levels')
export class LevelsController {
    constructor(
        @Inject(GET_LEVEL_PORT)
        private readonly levelService: GetLevelPort,
    ) {}

    @Get(':course/:module/:level')
    getLevel(
        @Param('course') course: Course,
        @Param('module') module: string,
        @Param('level', ParseIntPipe) level: number,
    ) {
        const cmd = GetLevelCmd.create(course, module, level);
        const levelContent = this.levelService.execute(cmd);
        return { data: levelContent };
    }
}
