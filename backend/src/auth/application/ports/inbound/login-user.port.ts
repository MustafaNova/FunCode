import { LoginUserCmd } from '../../dtos/commands/login-user.cmd';

export interface LoginUserPort {
    login(loginData: LoginUserCmd): Promise<boolean>;
}
