import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['username', 'email'], { unique: true })
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
