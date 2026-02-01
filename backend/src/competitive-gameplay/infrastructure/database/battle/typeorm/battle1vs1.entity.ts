import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('battle1vs1')
export class Battle1vs1Entity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    playerId1!: string;

    @Column()
    playerId2!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}
