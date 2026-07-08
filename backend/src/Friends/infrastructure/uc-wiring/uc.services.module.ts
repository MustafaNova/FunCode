import { Module } from '@nestjs/common';
import { CREATE_FRIEND_REQ_PORT } from './tokens';
import { CreateFriendReqService } from './createFriendReq.service';
import { UserLookUpModule } from '../UserLookUp/userLookUp.module';

@Module({
    imports: [UserLookUpModule],
    providers: [
        {
            provide: CREATE_FRIEND_REQ_PORT,
            useClass: CreateFriendReqService,
        }
    ],
    exports: [CREATE_FRIEND_REQ_PORT],
})
export class UcServicesModule {}