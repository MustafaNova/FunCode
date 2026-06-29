import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser, UserPayload } from '../../../../common/utils/user-payload.decorator';
import { type GetClanMessagesPort } from '../../../application/ports/inbound/getClanMessages.port';
import { GET_CLAN_MESSAGES_PORT } from '../../../infrastructure/uc-wiring/tokens';


@UseGuards(AuthGuard('jwt'))
@Controller('clan-chat')
export class ClanChatController {
    
    constructor(
        @Inject(GET_CLAN_MESSAGES_PORT)
        private readonly getMessagesUC: GetClanMessagesPort,
    ) {}

    @Get('messages')
    async getMessages(
        @UserPayload() user: AuthUser,
        @Query('before') before?: string,
        @Query('limit') limit?: string,
    ) {
        console.log('arrived clan-chat/messages');
        await this.getMessagesUC.getClanMessages({
            userId: user.userId,
            before,
            limit: limit ? Number(limit) : 50,
        });
    }

}