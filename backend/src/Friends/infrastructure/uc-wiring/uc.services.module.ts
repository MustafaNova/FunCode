import { Module } from '@nestjs/common';
import { CreateFriendReqService } from './createFriendReq.service';
import { UserLookUpModule } from '../UserLookUp/userLookUp.module';
import {
    ACCEPT_FRIEND_REQ_PORT,
    CREATE_FRIEND_REQ_PORT, DECLINE_FRIEND_REQ_PORT, DELETE_FRIEND_PORT,
    GET_FRIENDS_PORT,
    GET_INCOMING_FRIEND_REQ_PORT
} from '../tokens';
import { FriendRequestRepoModule } from '../FriendRequestRepo/friendRequestRepo.module';
import { GetIncomingFriendReqService } from './getIncomingFriendReq.service';
import { AcceptFriendReqService } from './acceptFriendReq.service';
import { AcceptFriendReqTransactionModule } from '../AcceptFriendReqTransaction/acceptFriendReqTransaction.module';
import { FriendShipRepoModule } from '../FriendShipRepo/friendShipRepo.module';
import { GetFriendsService } from './getFriends.service';
import { DeclineFriendReqService } from './declineFriendReq.service';
import { DeleteFriendService } from './deleteFriend.service';

@Module({
    imports: [UserLookUpModule,
        FriendRequestRepoModule,
        AcceptFriendReqTransactionModule,
        FriendShipRepoModule,
    ],
    providers: [
        {
            provide: CREATE_FRIEND_REQ_PORT,
            useClass: CreateFriendReqService,
        },
        {
            provide: GET_INCOMING_FRIEND_REQ_PORT,
            useClass: GetIncomingFriendReqService,
        },
        {
            provide: ACCEPT_FRIEND_REQ_PORT,
            useClass: AcceptFriendReqService,
        },
        {
            provide: GET_FRIENDS_PORT,
            useClass: GetFriendsService,
        },
        {
            provide: DECLINE_FRIEND_REQ_PORT,
            useClass: DeclineFriendReqService,
        },
        {
            provide: DELETE_FRIEND_PORT,
            useClass: DeleteFriendService,
        }
    ],
    exports: [
        CREATE_FRIEND_REQ_PORT,
        GET_INCOMING_FRIEND_REQ_PORT,
        ACCEPT_FRIEND_REQ_PORT,
        GET_FRIENDS_PORT,
        DECLINE_FRIEND_REQ_PORT,
        DELETE_FRIEND_PORT,
    ],
})
export class UcServicesModule {}