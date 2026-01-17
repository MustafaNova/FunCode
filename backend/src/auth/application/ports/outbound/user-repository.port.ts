import { Email } from '../../../domain/value-objects/email.vo';
import { Username } from '../../../domain/value-objects/username.vo';
import { User } from '../../../domain/entitys/user';
import { UserEntity } from '../../../infrastructure/persistence/typeorm/user.entity';

export interface UserRepositoryPort {
    checkEmailExists(email: Email): Promise<boolean>;
    checkUsernameExists(username: Username): Promise<boolean>;
    saveNewUser(user: User): Promise<UserEntity>;
}
