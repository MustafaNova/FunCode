import { DeleteFriendPort } from '../../ports/inbound/deleteFriend.port';
import { FriendShipRepoPort } from '../../ports/outbound/FriendShipRepo.port';
import { FriendshipNotFoundError } from './errors/friendshipNotFound.err';


export class DeleteFriendUC implements DeleteFriendPort {
    constructor(
        private readonly friendshipRepo: FriendShipRepoPort
    ) {}

    async deleteFriend(firstUserId: string, secondUserId: string): Promise<void> {
        const existsFriendship = await this.friendshipRepo.existsBetweenUsers(firstUserId, secondUserId);

        if (!existsFriendship) {
            throw new FriendshipNotFoundError();
        }

        await this.friendshipRepo.deleteBetweenUsers(firstUserId, secondUserId);
    }
}