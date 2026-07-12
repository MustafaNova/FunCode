import { GetIncomingFriendRequestsPort } from '../../ports/inbound/getIncomingFriendRequests.port';
import { FriendRequestRepoPort } from '../../ports/outbound/FriendRequestRepo.port';
import { IncomingFriendRequestRes } from '@funcode/shared';


export class GetIncomingFriendRequestsUC implements GetIncomingFriendRequestsPort {
    constructor(
        private readonly friendReqRepo: FriendRequestRepoPort,
    ) {}

    async getIncomingFriendRequests(receiverId: string): Promise<IncomingFriendRequestRes[]> {
        console.log('use-case getIncomingFriendRequests');
        const incomingFriendRequests = await this.friendReqRepo.findAllByReceiverId(receiverId);
        return incomingFriendRequests.map((friendReq) => ({
            id: friendReq.friendRequestId,
            senderUserId: friendReq.senderId,
            senderUsername: friendReq.senderUsername,
            createdAt: friendReq.createdAt
        }))
    }
}