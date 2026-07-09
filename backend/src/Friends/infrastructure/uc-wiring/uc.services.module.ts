import { Module } from '@nestjs/common';
import { CreateFriendReqService } from './createFriendReq.service';
import { UserLookUpModule } from '../UserLookUp/userLookUp.module';
import { CREATE_FRIEND_REQ_PORT } from '../tokens';
import { FriendRequestRepoModule } from '../FriendRequestRepo/friendRequestRepo.module';

@Module({
    imports: [UserLookUpModule, FriendRequestRepoModule],
    providers: [
        {
            provide: CREATE_FRIEND_REQ_PORT,
            useClass: CreateFriendReqService,
        }
    ],
    exports: [CREATE_FRIEND_REQ_PORT],
})
export class UcServicesModule {}