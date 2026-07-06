import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthUser, UserPayload } from '../../../common/utils/user-payload.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('friends')
export class FriendsController {

    @Post('friend-request')
    createFriendRequest(
        @UserPayload() user: AuthUser,
        @Body() payload: { inviteCode: string }) {
        console.log("createFriendRequest:", payload);
    }

}