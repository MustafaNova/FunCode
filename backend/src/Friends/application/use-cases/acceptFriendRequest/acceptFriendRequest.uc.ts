import { AcceptFriendRequestPort } from '../../ports/inbound/acceptFriendRequest.port';
import { AcceptFriendRequestCmd } from './acceptFriendRequest.cmd';
import { FriendRequestRepoPort } from '../../ports/outbound/FriendRequestRepo.port';
import { FriendRequestNotFoundError } from './errors/FriendRequestNotFound.err';
import { FriendRequestAccessDeniedError } from './errors/FriendRequestAccessDenied.err';
import { AcceptFriendRequestTransactionPort } from '../../ports/outbound/AcceptFriendRequestTransaction.port';
import { FriendShipRepoPort } from '../../ports/outbound/FriendShipRepo.port';
import { UserLookUpPort } from '../../ports/outbound/UserLookUp.port';
import { UserNotFoundError } from './errors/UserNotFound.err';


export class AcceptFriendRequestUC implements AcceptFriendRequestPort {
    constructor(
        private readonly friendReqRepo: FriendRequestRepoPort,
        private readonly acceptFriendRequestTx: AcceptFriendRequestTransactionPort,
        private readonly userLookUp: UserLookUpPort,
    ) {}

    async acceptFriendRequest(cmd: AcceptFriendRequestCmd): Promise<void> {
        const friendRequest = await this.friendReqRepo.findById(cmd.friendRequestId);

        if (friendRequest == null) {
            throw new FriendRequestNotFoundError(cmd.friendRequestId);
        }

        if (friendRequest.receiverId !== cmd.currentUserId) {
            throw new FriendRequestAccessDeniedError();
        }

        await this.acceptFriendRequestTx.acceptFriendRequest({
            friendRequestId: cmd.friendRequestId,
            senderId: friendRequest.senderId,
            receiverId: friendRequest.receiverId,
        })

        const newFriend = await this.userLookUp.findById(friendRequest.senderId);
        if (newFriend === null) {
            throw new UserNotFoundError(friendRequest.senderId);
        }

    }
}
