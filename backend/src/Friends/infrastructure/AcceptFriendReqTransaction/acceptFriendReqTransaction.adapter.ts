import {
    AcceptFriendRequestTransactionPort
} from '../../application/ports/outbound/AcceptFriendRequestTransaction.port';
import { AcceptFriendRequestTransactionParams } from '../../domain/types/AcceptFriendRequestTransactionParams';
import { DataSource } from 'typeorm';
import { FriendshipEntity } from '../FriendShipRepo/friendShip.entity';
import { FriendRequestEntity } from '../FriendRequestRepo/friendRequest.entity';


export class AcceptFriendReqTransactionAdapter implements AcceptFriendRequestTransactionPort {
    constructor(
        private readonly dataSource: DataSource,
    ) {}

    async acceptFriendRequest(params: AcceptFriendRequestTransactionParams): Promise<void> {
        await this.dataSource.transaction(async (manager) => {
            const friendshipRepo =
                manager.getRepository(FriendshipEntity);

            const friendRequestRepo =
                manager.getRepository(FriendRequestEntity);

            await friendshipRepo.save({
                firstUserId: params.senderId,
                secondUserId: params.receiverId,
            });

            await friendRequestRepo.delete({
                friendRequestId: params.friendRequestId,
            });
        });
    }
}