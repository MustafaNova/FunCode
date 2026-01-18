import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserPort } from '../../ports/inbound/register-user.port';
import { UserRegistrationCmd } from '../../dtos/commands/register-user.cmd';
import { RegisterUserResult } from '../../dtos/results/register-user.result';
import { Username } from '../../../domain/value-objects/username.vo';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import type { UserRepositoryPort } from '../../ports/outbound/user-repository.port';
import { USER_REPOSITORY_PORT } from '../../tokens';
import { User } from '../../../domain/entitys/user';

@Injectable()
export class UserRegistrationService implements RegisterUserPort {
    constructor(
        @Inject(USER_REPOSITORY_PORT)
        private readonly userRepository: UserRepositoryPort,
    ) {}

    async registerUser(
        userRegistration: UserRegistrationCmd,
    ): Promise<RegisterUserResult> {
        const username = Username.create(userRegistration.username);
        const email = Email.create(userRegistration.email);
        const password = await Password.create(userRegistration.password);

        if (await this.userRepository.checkUsernameExists(username)) {
            throw new BadRequestException('username already exists');
        }

        if (await this.userRepository.checkEmailExists(email)) {
            throw new BadRequestException('email already exists');
        }

        const user = new User(username, email, password);
        await this.userRepository.saveNewUser(user);

        return { username: username.get() };
    }
}
