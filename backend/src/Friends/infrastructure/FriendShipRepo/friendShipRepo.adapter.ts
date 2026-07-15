import { FriendShipRepoPort } from '../../application/ports/outbound/FriendShipRepo.port';
import { CreateFriendship } from '../../domain/types/CreateFriendship';
import { Repository } from 'typeorm';
import { FriendshipEntity } from './friendShip.entity';
import { InjectRepository } from '@nestjs/typeorm';


export class FriendShipRepoAdapter implements FriendShipRepoPort {
    constructor(
        @InjectRepository(FriendshipEntity)
        private readonly friendshipRepo: Repository<FriendshipEntity>
    ) {}


    async create(friendship: CreateFriendship): Promise<void> {
        const friendshipEntity = this.friendshipRepo.create({
            firstUserId: friendship.firstUserId,
            secondUserId: friendship.secondUserId,
        });

        await this.friendshipRepo.save(friendshipEntity);
    }
}