import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('levels')
export class LevelsController {

    @Get(':course/:module/:level')
    getLevel(
        @Param('course') course: string,
        @Param('module') module: string,
        @Param('level', ParseIntPipe) level: number,
    ) {

    }
}
