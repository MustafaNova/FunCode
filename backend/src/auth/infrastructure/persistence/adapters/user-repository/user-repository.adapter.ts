import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../../../application/ports/outbound/user-repository.port';
import { Email } from '../../../../domain/value-objects/email.vo';
import { Username } from '../../../../domain/value-objects/username.vo';
import { User } from '../../../../domain/entitys/user';
import { Repository } from 'typeorm';
import { UserEntity } from '../../typeorm/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

    async saveNewUser(user: User): Promise<void> {
        const entity = this.repo.create({
            username: user.username.get(),
            email: user.email.get(),
            password: user.password.get(),
        });

        await this.repo.save(entity);
    }
}
