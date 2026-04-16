import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('levels')
export class LevelsController {

    @Get(':id')
    getLevel(@Param('id') id: string) {

    }
}
