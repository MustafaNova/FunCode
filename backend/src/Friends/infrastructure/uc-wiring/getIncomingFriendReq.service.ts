import { Inject, Injectable } from '@nestjs/common';
import {
    GetIncomingFriendRequestsUC
} from '../../application/use-cases/getIncomingFriendRequests/getIncomingFriendRequests.uc';
import { type FriendRequestRepoPort } from '../../application/ports/outbound/FriendRequestRepo.port';
import { FRIEND_REQUEST_REPO_PORT } from '../tokens';


@Injectable()
export class GetIncomingFriendReqService extends GetIncomingFriendRequestsUC {
    constructor(
        @Inject(FRIEND_REQUEST_REPO_PORT)
        friendReqRepo: FriendRequestRepoPort
    ) {
        super(friendReqRepo);
    }
}