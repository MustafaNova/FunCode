import { Injectable } from '@nestjs/common';
import { RegisterUserPort } from '../../ports/inbound/register-user.port';
import { UserRegistrationCmd } from '../../dtos/commands/register-user.command';
import { RegisterUserResult } from '../../dtos/results/register-user.result';
import { User } from '../../../domain/entitys/user';
import { Username } from '../../../domain/value-objects/username.vo';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';

@Injectable()
export class UserRegistrationService implements RegisterUserPort {
    async registerUser(
        userRegistration: UserRegistrationCmd,
    ): Promise<RegisterUserResult> {
        const user = new User(
            Username.create(userRegistration.username),
            Email.create(userRegistration.email),
            Password.create(userRegistration.password),
        );
        return { success: true };
    }
}
