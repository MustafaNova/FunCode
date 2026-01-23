import { LoginUserCmd } from '../../dtos/commands/login-user.cmd';
import { LoginUserRes } from '../../dtos/results/login-user.res';

export interface LoginUserPort {
    login(loginData: LoginUserCmd): Promise<LoginUserRes>;
}
