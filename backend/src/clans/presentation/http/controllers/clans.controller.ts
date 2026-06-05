import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateClanDto } from './dto/createClan.dto';
import { AuthGuard } from '@nestjs/passport';
import { type CreateClanPort } from '../../../application/ports/inbound/createClan.port';
import { CREATE_CLAN } from '../../../infrastructure/uc-wiring/tokens';

@UseGuards(AuthGuard('jwt'))
@Controller('clans')
export class ClansController {
    constructor(
        @Inject(CREATE_CLAN)
        private readonly createClanUC: CreateClanPort,
    ) {}

    @Post()
    async createClan(@Body() req: CreateClanDto) {
        await this.createClanUC.createClan(req)
    }

}