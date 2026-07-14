import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

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
}