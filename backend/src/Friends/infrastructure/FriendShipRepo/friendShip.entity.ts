import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { UserEntity } from '../../../auth/infrastructure/persistence/typeorm/user.entity';

@Entity('friendships')
@Unique(['firstUserId', 'secondUserId'])
export class FriendshipEntity {
    @PrimaryGeneratedColumn('uuid')
    friendshipId: string;

    @Column()
    firstUserId: string;

    @Column()
    secondUserId: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'firstUserId' })
    firstUser: UserEntity

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'secondUserId' })
    secondUser: UserEntity
}