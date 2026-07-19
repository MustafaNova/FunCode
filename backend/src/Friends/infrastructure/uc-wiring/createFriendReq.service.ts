import { CreateFriendRequestUC } from '../../application/use-cases/createFriendRequest/createFriendRequest.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type UserLookUpPort } from '../../application/ports/outbound/UserLookUp.port';
import { FRIEND_REQUEST_REPO_PORT, FRIENDSHIP_REPO_PORT, USER_LOOK_UP_PORT } from '../tokens';
import { type FriendRequestRepoPort } from '../../application/ports/outbound/FriendRequestRepo.port';
import { type FriendShipRepoPort } from '../../application/ports/outbound/FriendShipRepo.port';

@Injectable()
export class CreateFriendReqService extends CreateFriendRequestUC {
    constructor(
        @Inject(USER_LOOK_UP_PORT)
        userLookUp: UserLookUpPort,
        @Inject(FRIEND_REQUEST_REPO_PORT)
        friendReqRepo: FriendRequestRepoPort,
        @Inject(FRIENDSHIP_REPO_PORT)
        friendshipRepo: FriendShipRepoPort
    ) {
        super(userLookUp, friendReqRepo, friendshipRepo);
    }
}