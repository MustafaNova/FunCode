import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('battle1vs1')
export class Battle1vs1Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    playerId1: string;

    @Column({ type: 'varchar' })
    playerUsername1: string;

    @Column({ type: 'varchar' })
    playerId2: string;

    @Column({ type: 'varchar' })
    playerUsername2: string;

    @Column({ type: 'varchar', nullable: true, default: null })
    winner: string | null;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
