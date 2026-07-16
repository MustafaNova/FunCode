import { AcceptFriendRequestPort } from '../../ports/inbound/acceptFriendRequest.port';
import { AcceptFriendRequestCmd } from './acceptFriendRequest.cmd';
import { FriendRequestRepoPort } from '../../ports/outbound/FriendRequestRepo.port';
import { FriendRequestNotFoundError } from './errors/FriendRequestNotFound.err';
import { FriendRequestAccessDeniedError } from './errors/FriendRequestAccessDenied.err';
import { AcceptFriendRequestTransactionPort } from '../../ports/outbound/AcceptFriendRequestTransaction.port';


export class AcceptFriendRequestUC implements AcceptFriendRequestPort {
    constructor(
        private readonly friendReqRepo: FriendRequestRepoPort,
        private readonly acceptFriendRequestTx: AcceptFriendRequestTransactionPort,
    ) {}

    async acceptFriendRequest(cmd: AcceptFriendRequestCmd): Promise<void> {
        const friendRequest = await this.friendReqRepo.findById(cmd.friendRequestId);

        if (friendRequest == null) {
            throw new FriendRequestNotFoundError(cmd.friendRequestId);
        }

        if (friendRequest.receiverId !== cmd.currentUserId) {
            throw new FriendRequestAccessDeniedError();
        }

        console.log('START ACCEPT TX');

        await this.acceptFriendRequestTx.acceptFriendRequest({
            friendRequestId: cmd.friendRequestId,
            senderId: friendRequest.senderId,
            receiverId: friendRequest.receiverId,
        })

        console.log('END ACCEPT TX');
    }
}