import { DeclineFriendRequestCmd } from '../../use-cases/declineFriendRequest/declineFriendRequest.cmd';

export interface DeclineFriendRequestPort {
    declineFriendRequest(cmd: DeclineFriendRequestCmd): Promise<void>;
}