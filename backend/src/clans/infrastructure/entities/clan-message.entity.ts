import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clan_messages')
export class ClanMessageEntity {
    @PrimaryGeneratedColumn('uuid')
    messageId: string

    @Column()
    clanId: string

    @Column()
    userId: string

    @Column()
    username: string

    @Column()
    message: string

    @CreateDateColumn()
    createdAt: Date
}