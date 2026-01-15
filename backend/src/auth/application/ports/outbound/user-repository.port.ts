import { Email } from '../../../domain/value-objects/email.vo';
import { Username } from '../../../domain/value-objects/username.vo';
import { User } from '../../../domain/entitys/user';

export interface UserRepositoryPort {
    checkEmailExists(email: Email): Promise<boolean>;
    checkUsernameExists(username: Username): Promise<boolean>;
    saveNewUser(user: User): Promise<void>;
}
