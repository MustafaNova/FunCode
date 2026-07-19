import { CreateFriendship } from '../../../domain/types/CreateFriendship';
import { Friend } from '../../../domain/types/friend';

export interface FriendShipRepoPort {
    create(friendship: CreateFriendship): Promise<void>;
    getAllFriendsById(userId: string): Promise<Friend[]>;
    existsBetweenUsers(firstUserId: string, secondUserId: string): Promise<boolean>
}