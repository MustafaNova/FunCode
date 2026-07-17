import { GetFriendsPort } from '../../ports/inbound/getFriends.port';
import { FriendShipRepoPort } from '../../ports/outbound/FriendShipRepo.port';
import { GetFriendsRes } from '@funcode/shared';


export class GetFriendsUC implements GetFriendsPort {
    constructor(
        private readonly friendshipRepo: FriendShipRepoPort
    ) {}

    async getFriends(userId: string): Promise<GetFriendsRes[]> {
        const friends = await this.friendshipRepo.getAllFriendsById(userId)
        return friends.map((friend) => ({
            userId: friend.userId,
            username: friend.username,
        }))
    }
}