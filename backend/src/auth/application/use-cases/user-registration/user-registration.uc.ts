import { RegisterUserPort } from '../../ports/inbound/register-user.port';
import { UserRegistrationCmd } from './dtos/register-user.cmd';
import { RegisterUserResult } from './dtos/register-user.result';
import { Username } from '../../../domain/value-objects/username.vo';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import type { UserRepositoryPort } from '../../ports/outbound/user-repository.port';
import { User } from '../../../domain/entitys/user';
import { UsernameAlreadyExistsError } from './errors/UsernameAlreadyExistsError';
import { EmailAlreadyExistsError } from './errors/EmailAlreadyExistsError';

export class UserRegistrationUC implements RegisterUserPort {
    constructor(private readonly userRepo: UserRepositoryPort) {}

    async registerUser(
        userRegistration: UserRegistrationCmd,
    ): Promise<RegisterUserResult> {
        const username = Username.create(userRegistration.username);
        const email = Email.create(userRegistration.email);
        const password = await Password.create(userRegistration.password);

        if (await this.userRepo.checkUsernameExists(username)) {
            throw new UsernameAlreadyExistsError();
        }

        if (await this.userRepo.checkEmailExists(email)) {
            throw new EmailAlreadyExistsError();
        }

        const user = new User(null, username, email, password);
        await this.userRepo.save(user);

        return RegisterUserResult.from(user);
    }
}
