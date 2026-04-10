import { Column, Entity } from 'typeorm';

@Entity('player_active_screen')
export class PlayerActiveScreenEntity {
    @Column({ type: 'uuid' })
    userId: string;

    @Column()
    activeCourse: string;

    @Column()
    activeModule: string;

    @Column()
    unlockedLevel: string;
}
