import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthUser, UserPayload } from '../../../common/utils/user-payload.decorator';
import { AuthGuard } from '@nestjs/passport';
import { type CreateFriendRequestReq } from '@funcode/shared';
import { type CreateFriendRequestPort } from '../../application/ports/inbound/createFriendRequest.port';
import { CREATE_FRIEND_REQ_PORT } from '../../infrastructure/uc-wiring/tokens';

@UseGuards(AuthGuard('jwt'))
@Controller('friends')
export class FriendsController {
    constructor(
        @Inject(CREATE_FRIEND_REQ_PORT)
        private readonly createFriendReqUC: CreateFriendRequestPort
    ) {}

    @Post('friend-request')
    async createFriendRequest(
        @UserPayload() user: AuthUser,
        @Body() payload: CreateFriendRequestReq) {
        await this.createFriendReqUC.createFriendRequest({
            senderId: user.userId,
            inviteCode: payload.inviteCode
        })
    }

}