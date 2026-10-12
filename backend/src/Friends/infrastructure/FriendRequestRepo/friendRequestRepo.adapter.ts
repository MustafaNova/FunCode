import { FriendRequestRepoPort } from '../../application/ports/outbound/FriendRequestRepo.port';
import { CreateFriendRequest } from '../../domain/types/CreateFriendRequest';
import { Repository } from 'typeorm';
import { FriendRequestEntity } from './friendRequest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequest } from '../../domain/types/friendRequest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendRequestRepoAdapter implements FriendRequestRepoPort {
    constructor(
        @InjectRepository(FriendRequestEntity)
        private readonly friendRequestRepo: Repository<FriendRequestEntity>
    ) {}

    async create(friendReq: CreateFriendRequest): Promise<void> {
        const friendRequestEntity= this.friendRequestRepo.create({
            senderUserId: friendReq.senderUserId,
            receiverUserId: friendReq.receiverUserId
        })
        await this.friendRequestRepo.save(friendRequestEntity)
    }

    async existsBetweenUsers(friendReq: CreateFriendRequest): Promise<boolean> {
        return this.friendRequestRepo.exists({
            where: {
                senderUserId: friendReq.senderUserId,
                receiverUserId: friendReq.receiverUserId
            }
        })
    }

    async findAllByReceiverId(receiverId: string): Promise<FriendRequest[]> {
        const friendRequests = await this.friendRequestRepo.find({
            where: { receiverUserId: receiverId },
            relations: {
                sender: true
            }
        })

        return friendRequests.map((entity) => ({
            friendRequestId: entity.friendRequestId,
            senderId: entity.senderUserId,
            senderUsername: entity.sender.username,
            receiverId: entity.receiverUserId,
            createdAt: entity.createdAt.toISOString()
        }))
    }

    async findById(friendRequestId: string): Promise<FriendRequest | null> {
        const res = await this.friendRequestRepo.findOne({
            where: { friendRequestId },
            relations: {
                sender: true
            }
        })

        if (res == null) return null;

        return {
            friendRequestId: res.friendRequestId,
            senderId: res.senderUserId,
            senderUsername: res.sender.username,
            receiverId: res.receiverUserId,
            createdAt: res.createdAt.toISOString()
        }
    }

    async deleteById(friendRequestId: string): Promise<void> {
        await this.friendRequestRepo.delete({ friendRequestId });
    }
}
