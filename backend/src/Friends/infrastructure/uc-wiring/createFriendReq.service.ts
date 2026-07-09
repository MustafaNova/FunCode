import { CreateFriendRequestUC } from '../../application/use-cases/createFriendRequest/createFriendRequest.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type UserLookUpPort } from '../../application/ports/outbound/UserLookUp.port';
import { FRIEND_REQUEST_REPO_PORT, USER_LOOK_UP_PORT } from '../tokens';
import { type FriendRequestRepoPort } from '../../application/ports/outbound/FriendRequestRepo.port';

@Injectable()
export class CreateFriendReqService extends CreateFriendRequestUC {
    constructor(
        @Inject(USER_LOOK_UP_PORT)
        userLookUp: UserLookUpPort,
        @Inject(FRIEND_REQUEST_REPO_PORT)
        friendReqRepo: FriendRequestRepoPort,
    ) {
        super(userLookUp, friendReqRepo);
    }
}