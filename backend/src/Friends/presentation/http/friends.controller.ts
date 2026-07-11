import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthUser, UserPayload } from '../../../common/utils/user-payload.decorator';
import { AuthGuard } from '@nestjs/passport';
import { type CreateFriendRequestReq } from '@funcode/shared';
import { type CreateFriendRequestPort } from '../../application/ports/inbound/createFriendRequest.port';
import { CREATE_FRIEND_REQ_PORT, GET_INCOMING_FRIEND_REQ_PORT } from '../../infrastructure/tokens';
import { type GetIncomingFriendRequestsPort } from '../../application/ports/inbound/getIncomingFriendRequests.port';

@UseGuards(AuthGuard('jwt'))
@Controller('friends')
export class FriendsController {
    constructor(
        @Inject(CREATE_FRIEND_REQ_PORT)
        private readonly createFriendReqUC: CreateFriendRequestPort,
        @Inject(GET_INCOMING_FRIEND_REQ_PORT)
        private readonly getIncomingFriendReqUC: GetIncomingFriendRequestsPort,
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

    @Get('friend-requests/incoming')
    async getIncomingFriendRequests(
        @UserPayload() user: AuthUser
    ) {
        console.log('controller getIncomingFriendRequests');
        return this.getIncomingFriendReqUC.getIncomingFriendRequests(user.userId);
    }
}