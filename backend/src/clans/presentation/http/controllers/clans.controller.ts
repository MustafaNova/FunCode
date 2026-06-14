import { Body, Controller, Delete, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { CreateClanDto } from './dto/createClan.dto';
import { AuthGuard } from '@nestjs/passport';
import { type CreateClanPort } from '../../../application/ports/inbound/createClan.port';
import {
    CREATE_CLAN_PORT,
    GET_MY_CLAN_PORT,
    LEAVE_CLAN_PORT,
    SEARCH_CLANS_PORT
} from '../../../infrastructure/uc-wiring/tokens';
import { AuthUser, UserPayload } from '../../../../common/utils/user-payload.decorator';
import { CreateClanCmd } from '../../../application/use-cases/createClan/createClan.cmd';
import { CreateClanRes, GetMyClanRes } from '@funcode/shared';
import { type GetMyClanPort } from '../../../application/ports/inbound/getMyClan.port';
import { type LeaveClanPort } from '../../../application/ports/inbound/leaveClan.port';
import { type SearchClansPort } from '../../../application/ports/inbound/searchClans.port';

@UseGuards(AuthGuard('jwt'))
@Controller('clans')
export class ClansController {
    constructor(
        @Inject(CREATE_CLAN_PORT)
        private readonly createClanUC: CreateClanPort,
        @Inject(GET_MY_CLAN_PORT)
        private readonly getMyClanUC: GetMyClanPort,
        @Inject(LEAVE_CLAN_PORT)
        private readonly leaveClanUC: LeaveClanPort,
        @Inject(SEARCH_CLANS_PORT)
        private readonly searchClansUC: SearchClansPort,
    ) {}

    @Post()
    async createClan(
        @Body() req: CreateClanDto,
        @UserPayload() user: AuthUser
    ): Promise<CreateClanRes> {
        console.log('createClan req');
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

    @Get('me')
    async getMyClan(@UserPayload() user: AuthUser): Promise<GetMyClanRes> {
        console.log('request getMyClan');
        const res = await this.getMyClanUC.getMyClan(user.userId);
        return {
            clanId: res.clanId,
            name: res.name,
            description: res.description,
            role: res.role,
        };
    }

    @Delete('me')
    async leaveClan(@UserPayload() user: AuthUser) {
        console.log('leaveClan req');
        await this.leaveClanUC.leaveClan(user.userId);
    }

    @Get('search')
    async searchClans(
        @Query('name') name: string,
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
    }
}
