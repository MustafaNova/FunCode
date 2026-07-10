import { GetIncomingFriendRequestsPort } from '../../ports/inbound/getIncomingFriendRequests.port';
import { IncomingFriendRequestResponse } from './incomingFriendRequest.response';
import { FriendRequestRepoPort } from '../../ports/outbound/FriendRequestRepo.port';


export class GetIncomingFriendRequestsUC implements GetIncomingFriendRequestsPort {
    constructor(
        private readonly friendReqRepo: FriendRequestRepoPort,
    ) {
    }
    getIncomingFriendRequests(receiverId: string): IncomingFriendRequestResponse[] {

    }
}