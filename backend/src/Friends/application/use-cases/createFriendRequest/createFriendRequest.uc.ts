import { CreateFriendRequestPort } from '../../ports/inbound/createFriendRequest.port';
import { CreateFriendReqCmd } from './createFriendReq.cmd';
import { UserLookUpPort } from '../../ports/outbound/UserLookUp.port';
import { InviteCodeNotFound } from './InviteCodeNotFound.err';


export class CreateFriendRequestUC implements CreateFriendRequestPort {
    constructor(
        private readonly userLookUp: UserLookUpPort
    ) {}

    async createFriendRequest(cmd: CreateFriendReqCmd) {
        const senderId = cmd.senderId;
        const receiverId = await this.userLookUp.findUserIdByInviteCode(cmd.inviteCode);

        if (!receiverId) {
            throw new InviteCodeNotFound();
        }
    }
}