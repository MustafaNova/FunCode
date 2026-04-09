import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('player_progress')
export class PlayerProgressEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    userId: string;

    @Column()
    course: string;

    @Column()
    module: string;

    @Column({ default: 1 })
    unlockedLevel: number;
}
