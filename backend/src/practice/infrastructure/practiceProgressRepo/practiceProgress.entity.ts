import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PracticeGameMode } from '../../domain/enums/practiceGameMode';


@Entity('practice_progress')
export class PracticeProgressEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column({
        type: 'enum',
        enum: PracticeGameMode,
    })
    gameMode: PracticeGameMode;

    @Column({ default: 1 })
    highestUnlockedLevel: number;

    @Column({ default: false })
    completedAllLevels: boolean;
}