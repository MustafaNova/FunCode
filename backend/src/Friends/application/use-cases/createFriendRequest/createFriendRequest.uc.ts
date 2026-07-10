import { CreateFriendRequestPort } from '../../ports/inbound/createFriendRequest.port';
import { CreateFriendReqCmd } from './createFriendReq.cmd';
import { UserLookUpPort } from '../../ports/outbound/UserLookUp.port';
import { InviteCodeNotFound } from './errors/InviteCodeNotFound.err';
import { FriendRequestRepoPort } from '../../ports/outbound/FriendRequestRepo.port';
import { SelfFriendRequestError } from './errors/selfFriendRequest.err';
import { FriendRequestAlreadyExistsError } from './errors/friendRequestAlreadyExists.err';


export class CreateFriendRequestUC implements CreateFriendRequestPort {
    constructor(
        private readonly userLookUp: UserLookUpPort,
        private readonly friendReqRepo: FriendRequestRepoPort,
    ) {}

    async createFriendRequest(cmd: CreateFriendReqCmd) {
        const senderUserId = cmd.senderId;
        const receiverUserId = await this.userLookUp.findUserIdByInviteCode(cmd.inviteCode);

        if (receiverUserId == null) {
            throw new InviteCodeNotFound();
        }

        if (senderUserId === receiverUserId) {
            throw new SelfFriendRequestError();
        }

        const friendRequestAlreadyExists = await this.friendReqRepo.existsBetweenUsers({ senderUserId, receiverUserId });
        if (friendRequestAlreadyExists) {
            throw new FriendRequestAlreadyExistsError();
        }

        await this.friendReqRepo.create({ senderUserId, receiverUserId });
    }
}
