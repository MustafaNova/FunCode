import { FriendRequest } from '../../../domain/types/friendRequest';

export interface FriendRequestRepoPort {
    create(friendReq: FriendRequest): Promise<void>;
}