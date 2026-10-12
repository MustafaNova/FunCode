import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../auth/infrastructure/persistence/typeorm/user.entity';

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

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'senderUserId' })
    sender: UserEntity
}