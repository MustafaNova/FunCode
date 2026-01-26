import { RegisterUserResult } from '../../use-cases/user-registration/dtos/register-user.result';
import { UserRegistrationCmd } from '../../use-cases/user-registration/dtos/register-user.cmd';

export interface RegisterUserPort {
    registerUser(
        userRegistration: UserRegistrationCmd,
    ): Promise<RegisterUserResult>;
}
