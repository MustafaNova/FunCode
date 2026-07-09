import { FriendRequestRepoPort } from '../../application/ports/outbound/FriendRequestRepo.port';
import { FriendRequest } from '../../domain/types/friendRequest';
import { Repository } from 'typeorm';
import { FriendRequestEntity } from './friendRequest.entity';
import { InjectRepository } from '@nestjs/typeorm';


export class FriendRequestRepoAdapter implements FriendRequestRepoPort {
    constructor(
        @InjectRepository(FriendRequestEntity)
        private readonly friendRequestRepo: Repository<FriendRequestEntity>
    ) {}

    async create(friendReq: FriendRequest): Promise<void> {
        const friendRequestEntity= this.friendRequestRepo.create({
            senderUserId: friendReq.senderUserId,
            receiverUserId: friendReq.receiverUserId
        })
        await this.friendRequestRepo.save(friendRequestEntity)
    }
}