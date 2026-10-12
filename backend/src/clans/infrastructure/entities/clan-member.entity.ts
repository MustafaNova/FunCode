import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClanEntity } from './clan.entity';
import { ClanRole } from '../../domain/enums/clanRole.enum';

@Entity('clan_members')
export class ClanMemberEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    clanId: string;

    @Column({
        type: 'enum',
        enum: ClanRole,
        default: ClanRole.MEMBER
    })
    role: ClanRole;

    @ManyToOne(() => ClanEntity, clan => clan.members)
    @JoinColumn({ name: 'clanId' })
    clan: ClanEntity;
}
