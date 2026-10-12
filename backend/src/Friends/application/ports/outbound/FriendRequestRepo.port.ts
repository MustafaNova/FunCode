import { CreateFriendRequest } from '../../../domain/types/CreateFriendRequest';
import { FriendRequest } from '../../../domain/types/friendRequest';

export interface FriendRequestRepoPort {
    create(friendReq: CreateFriendRequest): Promise<void>;
    existsBetweenUsers(friendReq: CreateFriendRequest): Promise<boolean>;
    findAllByReceiverId(receiverId: string): Promise<FriendRequest[]>;
    findById(friendRequestId: string): Promise<FriendRequest | null>;
    deleteById(friendRequestId: string): Promise<void>;
}