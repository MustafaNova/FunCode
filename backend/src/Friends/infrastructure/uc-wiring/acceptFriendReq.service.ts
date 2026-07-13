import { AcceptFriendRequestUC } from '../../application/use-cases/acceptFriendRequest/acceptFriendRequest.uc';
import { Inject, Injectable } from '@nestjs/common';
import { FRIEND_REQUEST_REPO_PORT } from '../tokens';
import { type FriendRequestRepoPort } from '../../application/ports/outbound/FriendRequestRepo.port';

@Injectable()
export class AcceptFriendReqService extends AcceptFriendRequestUC {
    constructor(
        @Inject(FRIEND_REQUEST_REPO_PORT)
        friendReqRepo: FriendRequestRepoPort
    ) {
        super(friendReqRepo);
    }
}