import { DeclineFriendRequestPort } from '../../ports/inbound/declineFriendRequest.port';
import { DeclineFriendRequestCmd } from './declineFriendRequest.cmd';
import { FriendRequestRepoPort } from '../../ports/outbound/FriendRequestRepo.port';
import { FriendRequestNotFoundError } from '../acceptFriendRequest/errors/FriendRequestNotFound.err';
import { FriendRequestAccessDeniedError } from '../acceptFriendRequest/errors/FriendRequestAccessDenied.err';


export class DeclineFriendRequestUC implements DeclineFriendRequestPort {
    constructor(
        private readonly friendReqRepo: FriendRequestRepoPort
    ) {}

    async declineFriendRequest(cmd: DeclineFriendRequestCmd): Promise<void> {
        const friendRequest = await this.friendReqRepo.findById(cmd.friendRequestId);

        if (friendRequest === null) {
            throw new FriendRequestNotFoundError(cmd.friendRequestId);
        }

        if (friendRequest.receiverId !== cmd.currentUserId) {
            throw new FriendRequestAccessDeniedError();
        }

        await this.friendReqRepo.deleteById(cmd.friendRequestId);
    }
}