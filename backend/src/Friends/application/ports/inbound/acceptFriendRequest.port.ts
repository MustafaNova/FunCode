import { AcceptFriendRequestCmd } from '../../use-cases/acceptFriendRequest/acceptFriendRequest.cmd';
import { AcceptFriendReqRes } from '@funcode/shared';

export interface AcceptFriendRequestPort {
    acceptFriendRequest(cmd: AcceptFriendRequestCmd): Promise<AcceptFriendReqRes>;
}