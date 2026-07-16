import { AcceptFriendRequestUC } from '../../application/use-cases/acceptFriendRequest/acceptFriendRequest.uc';
import { Inject, Injectable } from '@nestjs/common';
import { FRIEND_REQ_TX_PORT, FRIEND_REQUEST_REPO_PORT } from '../tokens';
import { type FriendRequestRepoPort } from '../../application/ports/outbound/FriendRequestRepo.port';
import {
    type AcceptFriendRequestTransactionPort
} from '../../application/ports/outbound/AcceptFriendRequestTransaction.port';

@Injectable()
export class AcceptFriendReqService extends AcceptFriendRequestUC {
    constructor(
        @Inject(FRIEND_REQUEST_REPO_PORT)
        friendReqRepo: FriendRequestRepoPort,
        @Inject(FRIEND_REQ_TX_PORT)
        acceptFriendReqTx: AcceptFriendRequestTransactionPort,
    ) {
        super(friendReqRepo, acceptFriendReqTx);
    }
}