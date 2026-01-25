import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../../../application/ports/outbound/user-repository.port';
import { Email } from '../../../../domain/value-objects/email.vo';
import { Username } from '../../../../domain/value-objects/username.vo';
import { User } from '../../../../domain/entitys/user';
import { Repository } from 'typeorm';
import { UserEntity } from '../../typeorm/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from '../../../../domain/value-objects/password.vo';
import { UserId } from '../../../../domain/value-objects/userId.vo';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
    ) {}

    checkEmailExists(email: Email): Promise<boolean> {
        return this.repo.exists({ where: { email: email.get() } });
    }

    checkUsernameExists(username: Username): Promise<boolean> {
        return this.repo.exists({ where: { username: username.get() } });
    }

    save(user: User): Promise<UserEntity> {
        const entity = this.repo.create({
            username: user.username.get(),
            email: user.email.get(),
            password: user.password.get(),
        });

        return this.repo.save(entity);
    }

    async findByUsername(username: Username): Promise<User | null> {
        const user = await this.repo.findOneBy({ username: username.get() });
        if (!user) return null;
        return new User(
            UserId.create(user.id),
            Username.fromPersistence(user.username),
            Email.fromPersistence(user.email),
            Password.fromPersistence(user.password),
        );
    }
}
