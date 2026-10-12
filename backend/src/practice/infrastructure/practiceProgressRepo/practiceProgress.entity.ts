import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { type PracticeGameMode } from '@funcode/shared';


@Entity('practice_progress')
export class PracticeProgressEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    gameMode: PracticeGameMode;

    @Column({ default: 1 })
    highestUnlockedLevel: number;

    @Column({ default: false })
    completedAllLevels: boolean;
}