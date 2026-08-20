import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity('bug_hunter_progress')
export class BugHunterProgressEntity {
    @PrimaryColumn('uuid')
    userId: string;

    @Column({ default: 1 })
    highestUnlockedLevel: number;

    @Column({ default: false })
    completedAllLevels: boolean;
}