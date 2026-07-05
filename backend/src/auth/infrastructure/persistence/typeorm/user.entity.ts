import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('idx_username', ['username'], { unique: true })
@Index('idx_email', ['email'], { unique: true })
@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    username: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'boolean', default: false })
    hasCompletedOnboarding: boolean;

    @Column({ unique: true })
    inviteCode: string;
}
