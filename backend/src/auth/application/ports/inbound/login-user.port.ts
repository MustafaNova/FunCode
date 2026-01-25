import { LoginUserCmd } from '../../use-cases/user-login/login-user.cmd';
import { LoginUserRes } from '../../use-cases/user-login/login-user.res';

export interface LoginUserPort {
    login(loginData: LoginUserCmd): Promise<LoginUserRes>;
}
