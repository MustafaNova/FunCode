import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateClanDto } from './dto/createClan.dto';
import { AuthGuard } from '@nestjs/passport';
import { type CreateClanPort } from '../../../application/ports/inbound/createClan.port';
import { CREATE_CLAN } from '../../../infrastructure/uc-wiring/tokens';
import { AuthUser, UserPayload } from '../../../../common/utils/user-payload.decorator';
import { CreateClanCmd } from '../../../application/use-cases/createClan/createClan.cmd';
import { CreateClanRes } from '@funcode/shared';

@UseGuards(AuthGuard('jwt'))
@Controller('clans')
export class ClansController {
    constructor(
        @Inject(CREATE_CLAN)
        private readonly createClanUC: CreateClanPort,
    ) {}

    @Post()
    async createClan(
        @Body() req: CreateClanDto,
        @UserPayload() user: AuthUser
    ): Promise<CreateClanRes> {
        const cmd: CreateClanCmd = {
            name: req.name,
            description: req.description,
            userId: user.userId
        }
        const clan = await this.createClanUC.createClan(cmd)
        return {
            message: 'Clan successfully created',
            clanId: clan.id
        }
    }
}