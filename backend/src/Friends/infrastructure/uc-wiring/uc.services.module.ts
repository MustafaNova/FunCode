import { Module } from '@nestjs/common';
import { CreateFriendReqService } from './createFriendReq.service';
import { UserLookUpModule } from '../UserLookUp/userLookUp.module';
import {
    ACCEPT_FRIEND_REQ_PORT,
    CREATE_FRIEND_REQ_PORT,
    GET_FRIENDS_PORT,
    GET_INCOMING_FRIEND_REQ_PORT
} from '../tokens';
import { FriendRequestRepoModule } from '../FriendRequestRepo/friendRequestRepo.module';
import { GetIncomingFriendReqService } from './getIncomingFriendReq.service';
import { AcceptFriendReqService } from './acceptFriendReq.service';
import { AcceptFriendReqTransactionModule } from '../AcceptFriendReqTransaction/acceptFriendReqTransaction.module';
import { FriendShipRepoModule } from '../FriendShipRepo/friendShipRepo.module';
import { GetFriendsService } from './getFriends.service';

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
        }
    ],
    exports: [CREATE_FRIEND_REQ_PORT, GET_INCOMING_FRIEND_REQ_PORT, ACCEPT_FRIEND_REQ_PORT, GET_FRIENDS_PORT],
})
export class UcServicesModule {}