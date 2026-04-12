import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('player_active_screen')
export class PlayerActiveScreenEntity {
    @PrimaryColumn({ type: 'uuid' })
    userId: string;

    @Column({ type: 'uuid' })
    progressId: string;
}
