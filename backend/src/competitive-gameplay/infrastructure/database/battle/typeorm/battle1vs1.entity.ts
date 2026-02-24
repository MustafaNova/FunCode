import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('battle1vs1')
export class Battle1vs1Entity {
    @PrimaryColumn({ type: 'varchar' })
    roomId: string;

    @Column({ type: 'varchar' })
    playerId1: string;

    @Column({ type: 'varchar' })
    playerUsername1: string;

    @Column({ type: 'varchar' })
    playerId2: string;

    @Column({ type: 'varchar' })
    playerUsername2: string;

    @Column({ type: 'varchar', nullable: true, default: null })
    winnerId: string | null;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
