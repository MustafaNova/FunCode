import { CreateFriendReqCmd } from '../../use-cases/createFriendRequest/createFriendReq.cmd';

export interface CreateFriendRequestPort {
    createFriendRequest(cmd: CreateFriendReqCmd): Promise<void>
}