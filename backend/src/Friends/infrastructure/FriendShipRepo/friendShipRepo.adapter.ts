import { FriendShipRepoPort } from '../../application/ports/outbound/FriendShipRepo.port';
import { CreateFriendship } from '../../domain/types/CreateFriendship';
import { Repository } from 'typeorm';
import { FriendshipEntity } from './friendShip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
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

    async getAllFriendsById(userId: string) {
        const friendships = await this.friendshipRepo.find({
            where: [
                { firstUserId: userId },
                { secondUserId: userId }
            ],
            relations: {
                firstUser: true,
                secondUser: true,
            }
        })

        return friendships.map((friendship) => {
            const friend =
                friendship.firstUserId === userId
                    ? friendship.secondUser
                    : friendship.firstUser;

            return {
                userId: friend.id,
                username: friend.username
            }
        })


    }

    existsBetweenUsers(firstUserId: string, secondUserId: string): Promise<boolean> {
        return this.friendshipRepo.exists({
            where: [
                {
                    firstUserId,
                    secondUserId,
                },
                {
                    firstUserId: secondUserId,
                    secondUserId: firstUserId,
                },
            ],
        });
    }

    async deleteBetweenUsers(firstUserId: string, secondUserId: string): Promise<void> {
        await this.friendshipRepo.delete([
            {
                firstUserId,
                secondUserId
            },
            {
                firstUserId: secondUserId,
                secondUserId: firstUserId,
            }
        ])
    }

}