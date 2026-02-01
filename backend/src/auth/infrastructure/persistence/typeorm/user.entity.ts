import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('idx_username', ['username'], { unique: true })
@Index('idx_email', ['email'], { unique: true })
@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;
}
