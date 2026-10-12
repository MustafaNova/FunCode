import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClanMemberEntity } from './clan-member.entity';


@Entity('clans')
export class ClanEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 162, nullable: true })
    description: string;

    @OneToMany(() => ClanMemberEntity, member => member.clan)
    members: ClanMemberEntity[];
}