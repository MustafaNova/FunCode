import { AcceptFriendRequestPort } from '../../ports/inbound/acceptFriendRequest.port';
import { AcceptFriendRequestCmd } from './acceptFriendRequest.cmd';
import { FriendRequestRepoPort } from '../../ports/outbound/FriendRequestRepo.port';


export class AcceptFriendRequestUC implements AcceptFriendRequestPort {
    constructor(
        private readonly friendReqRepo: FriendRequestRepoPort
    ) {}

    async acceptFriendRequest(cmd: AcceptFriendRequestCmd): Promise<void> {
        console.log('AcceptFriendRequestUC');
    }
}