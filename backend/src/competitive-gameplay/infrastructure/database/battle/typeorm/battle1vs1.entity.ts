import { Column, Entity, PrimaryColumn } from 'typeorm';
import { type ArenaGameModeId } from '@funcode/shared';
import { BattleStatus } from '../../../../domain/enums/battle.status';

@Entity('battle1vs1')
export class Battle1vs1Entity {
    @PrimaryColumn({ type: 'uuid' })
    roomId: string;

    @Column({ type: 'uuid' })
    playerId1: string;

    @Column()
    playerUsername1: string;

    @Column({ type: 'uuid' })
    playerId2: string;

    @Column()
    playerUsername2: string;

    @Column()
    gameModeId: ArenaGameModeId;

    @Column({ type: 'uuid', nullable: true, default: null })
    winnerId: string | null;

    @Column({
        type: 'varchar',
        default: BattleStatus.ACTIVE,
    })
    status: BattleStatus;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
}
