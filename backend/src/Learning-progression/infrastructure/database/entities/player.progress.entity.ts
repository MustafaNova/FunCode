import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '@funcode/shared';

@Entity('player_progress')
export class PlayerProgressEntity {
    @PrimaryGeneratedColumn('uuid')
    progressId: string;

    @Column({ type: 'uuid' })
    userId: string;

    @Column()
    course: Course;

    @Column()
    module: string;

    @Column({ default: 1 })
    unlockedLevel: number;
}
