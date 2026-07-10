import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('friend_requests')
export class FriendRequestEntity {
    @PrimaryGeneratedColumn('uuid')
    friendRequestId: string;

    @Column('uuid')
    senderUserId: string;

    @Column('uuid')
    receiverUserId: string;

    @CreateDateColumn()
    createdAt: Date;
}