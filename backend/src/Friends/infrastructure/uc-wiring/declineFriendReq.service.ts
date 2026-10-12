import { DeclineFriendRequestUC } from '../../application/use-cases/declineFriendRequest/declineFriendRequest.uc';
import { Inject, Injectable } from '@nestjs/common';
import { FRIEND_REQUEST_REPO_PORT } from '../tokens';
import { type FriendRequestRepoPort } from '../../application/ports/outbound/FriendRequestRepo.port';

@Injectable()
export class DeclineFriendReqService extends DeclineFriendRequestUC {
    constructor(
        @Inject(FRIEND_REQUEST_REPO_PORT)
        friendReqRepo: FriendRequestRepoPort,
    ) {
        super(friendReqRepo);
    }
}