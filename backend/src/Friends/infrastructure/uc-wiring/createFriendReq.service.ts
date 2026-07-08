import { CreateFriendRequestUC } from '../../application/use-cases/createFriendRequest/createFriendRequest.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type UserLookUpPort } from '../../application/ports/outbound/UserLookUp.port';
import { USER_LOOK_UP_PORT } from '../UserLookUp/tokens';

@Injectable()
export class CreateFriendReqService extends CreateFriendRequestUC {
    constructor(
        @Inject(USER_LOOK_UP_PORT)
        userLookUp: UserLookUpPort
    ) {
        super(userLookUp);
    }
}