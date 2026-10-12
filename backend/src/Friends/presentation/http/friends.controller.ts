import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthUser, UserPayload } from '../../../common/utils/user-payload.decorator';
import { AuthGuard } from '@nestjs/passport';
import { type CreateFriendRequestReq } from '@funcode/shared';
import { type CreateFriendRequestPort } from '../../application/ports/inbound/createFriendRequest.port';
import {
    ACCEPT_FRIEND_REQ_PORT,
    CREATE_FRIEND_REQ_PORT, DECLINE_FRIEND_REQ_PORT, DELETE_FRIEND_PORT, GET_FRIENDS_PORT,
    GET_INCOMING_FRIEND_REQ_PORT
} from '../../infrastructure/tokens';
import { type GetIncomingFriendRequestsPort } from '../../application/ports/inbound/getIncomingFriendRequests.port';
import { type AcceptFriendRequestPort } from '../../application/ports/inbound/acceptFriendRequest.port';
import { type GetFriendsPort } from '../../application/ports/inbound/getFriends.port';
import { type DeclineFriendRequestPort } from '../../application/ports/inbound/declineFriendRequest.port';
import { type DeleteFriendPort } from '../../application/ports/inbound/deleteFriend.port';

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
        @Inject(GET_FRIENDS_PORT)
        private readonly getFriendsUC: GetFriendsPort,
        @Inject(DECLINE_FRIEND_REQ_PORT)
        private readonly declineFriendReqUC: DeclineFriendRequestPort,
        @Inject(DELETE_FRIEND_PORT)
        private readonly deleteFriendUC: DeleteFriendPort,
    ) {}


    @Get()
    async getFriends(
        @UserPayload() user: AuthUser,
    ) {
        return this.getFriendsUC.getFriends(user.userId)
    }

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
        return this.getIncomingFriendReqUC.getIncomingFriendRequests(user.userId);
    }

    @Post('friend-requests/accept/:id')
    async acceptFriendRequest(
        @Param('id') friendRequestId: string,
        @UserPayload() user: AuthUser,
    ) {
        return this.acceptFriendReqUC.acceptFriendRequest({
            friendRequestId,
            currentUserId: user.userId
        })
    }

    @Post('friend-requests/decline/:id')
    async declineFriendRequest(
        @Param('id') friendRequestId: string,
        @UserPayload() user: AuthUser,
    ) {
        await this.declineFriendReqUC.declineFriendRequest({
            friendRequestId,
            currentUserId: user.userId,
        })
    }

    @Delete(':friendUserId')
    async deleteFriend(
        @Param('friendUserId') friendUserId: string,
        @UserPayload() user: AuthUser,
    ): Promise<void> {
        console.log('deleteFriend controller: ', friendUserId);
        await this.deleteFriendUC.deleteFriend(friendUserId, user.userId);
    }
}
