import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthUser, UserPayload } from '../../../common/utils/user-payload.decorator';
import { AuthGuard } from '@nestjs/passport';
import { type CreateFriendRequestReq } from '@funcode/shared';
import { type CreateFriendRequestPort } from '../../application/ports/inbound/createFriendRequest.port';
import {
    ACCEPT_FRIEND_REQ_PORT,
    CREATE_FRIEND_REQ_PORT,
    GET_INCOMING_FRIEND_REQ_PORT
} from '../../infrastructure/tokens';
import { type GetIncomingFriendRequestsPort } from '../../application/ports/inbound/getIncomingFriendRequests.port';
import { type AcceptFriendRequestPort } from '../../application/ports/inbound/acceptFriendRequest.port';

@UseGuards(AuthGuard('jwt'))
@Controller('friends')
export class FriendsController {
    constructor(
        @Inject(CREATE_FRIEND_REQ_PORT)
        private readonly createFriendReqUC: CreateFriendRequestPort,
        @Inject(GET_INCOMING_FRIEND_REQ_PORT)
        private readonly getIncomingFriendReqUC: GetIncomingFriendRequestsPort,
        @Inject(ACCEPT_FRIEND_REQ_PORT)
        private readonly acceptFriendReqUC: AcceptFriendRequestPort,
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

    @Post('friend-requests/accept/:id')
    async acceptFriendRequest(
        @Param('id') friendRequestId: string,
        @UserPayload() user: AuthUser,
    ) {
        console.log("acceptFriendRequest", friendRequestId);
        await this.acceptFriendReqUC.acceptFriendRequest({
            friendRequestId,
            currentUserId: user.userId
        })
    }
}