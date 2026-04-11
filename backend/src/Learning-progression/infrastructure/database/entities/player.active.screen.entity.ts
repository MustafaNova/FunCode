import { Column, Entity } from 'typeorm';

@Entity('player_active_screen')
export class PlayerActiveScreenEntity {
    @Column({ type: 'uuid' })
    userId: string;

    @Column({ type: 'uuid' })
    progressId: string;
}
