import { Module } from '@nestjs/common';
import { CreateFriendReqService } from './createFriendReq.service';
import { UserLookUpModule } from '../UserLookUp/userLookUp.module';
import { CREATE_FRIEND_REQ_PORT, GET_INCOMING_FRIEND_REQ_PORT } from '../tokens';
import { FriendRequestRepoModule } from '../FriendRequestRepo/friendRequestRepo.module';
import { GetIncomingFriendReqService } from './getIncomingFriendReq.service';

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
        }
    ],
    exports: [CREATE_FRIEND_REQ_PORT, GET_INCOMING_FRIEND_REQ_PORT],
})
export class UcServicesModule {}