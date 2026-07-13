import { Module } from '@nestjs/common';
import { CreateFriendReqService } from './createFriendReq.service';
import { UserLookUpModule } from '../UserLookUp/userLookUp.module';
import { ACCEPT_FRIEND_REQ_PORT, CREATE_FRIEND_REQ_PORT, GET_INCOMING_FRIEND_REQ_PORT } from '../tokens';
import { FriendRequestRepoModule } from '../FriendRequestRepo/friendRequestRepo.module';
import { GetIncomingFriendReqService } from './getIncomingFriendReq.service';
import { AcceptFriendReqService } from './acceptFriendReq.service';

@Module({
    imports: [UserLookUpModule, FriendRequestRepoModule],
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
        }
    ],
    exports: [CREATE_FRIEND_REQ_PORT, GET_INCOMING_FRIEND_REQ_PORT, ACCEPT_FRIEND_REQ_PORT],
})
export class UcServicesModule {}