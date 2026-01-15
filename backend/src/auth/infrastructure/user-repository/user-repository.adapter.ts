import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../application/ports/outbound/user-repository.port';
import { Email } from '../../domain/value-objects/email.vo';
import { Username } from '../../domain/value-objects/username.vo';
import { User } from '../../domain/entitys/user';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
    checkEmailExists(email: Email): Promise<boolean> {
        return Promise.resolve(true);
    }

    checkUsernameExists(username: Username): Promise<boolean> {
        return Promise.resolve(true);
    }

    saveNewUser(user: User): Promise<void> {
        return Promise.resolve();
    }
}
