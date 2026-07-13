import { AcceptFriendRequestCmd } from '../../use-cases/acceptFriendRequest/acceptFriendRequest.cmd';

export interface AcceptFriendRequestPort {
    acceptFriendRequest(cmd: AcceptFriendRequestCmd): Promise<void>;
}