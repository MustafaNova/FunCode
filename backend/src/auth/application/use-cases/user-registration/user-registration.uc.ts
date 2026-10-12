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
import { InviteCodeGeneratorPort } from '../../ports/outbound/inviteCodeGenerator.port';

export class UserRegistrationUC implements RegisterUserPort {
    constructor(
        private readonly userRepo: UserRepositoryPort,
        private readonly inviteCodeGenerator: InviteCodeGeneratorPort
    ) {}

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

        const inviteCode = await this.generateUniqueInviteCode();

        const user = new User(
            null,
            username,
            email,
            password,
            false,
            inviteCode
        );

        await this.userRepo.save(user);

        return RegisterUserResult.from(user);
    }

    private async generateUniqueInviteCode(): Promise<string> {
        let inviteCode: string;

        do {
            inviteCode = this.inviteCodeGenerator.generate();
        } while (await this.userRepo.checkInviteCodeExists(inviteCode))

        return inviteCode
    }
}
