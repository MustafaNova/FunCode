import { CreateFriendship } from '../../../domain/types/CreateFriendship';

export interface FriendShipRepoPort {
    create(friendship: CreateFriendship): Promise<void>;
}