import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClanEntity } from './clan.entity';

@Entity('clan_members')
export class ClanMemberEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    clanId: string;

    @Column({ default: 'member' })
    role: string;

    @ManyToOne(() => ClanEntity, clan => clan.members)
    clan: ClanEntity;
}