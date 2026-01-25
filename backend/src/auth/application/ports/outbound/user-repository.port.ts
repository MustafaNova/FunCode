import { Email } from '../../../domain/value-objects/email.vo';
import { Username } from '../../../domain/value-objects/username.vo';
import { User } from '../../../domain/entitys/user';
import { UserEntity } from '../../../infrastructure/persistence/typeorm/user.entity';

export interface UserRepositoryPort {
    checkEmailExists(email: Email): Promise<boolean>;
    checkUsernameExists(username: Username): Promise<boolean>;
    save(user: User): Promise<UserEntity>;
    findByUsername(username: Username): Promise<User | null>;
}
