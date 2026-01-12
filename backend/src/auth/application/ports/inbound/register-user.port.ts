import { RegisterUserResult } from '../../dtos/results/register-user.result';
import { UserRegistrationCmd } from '../../dtos/commands/register-user.command';

export interface RegisterUserPort {
    registerUser(
        userRegistration: UserRegistrationCmd,
    ): Promise<RegisterUserResult>;
}
