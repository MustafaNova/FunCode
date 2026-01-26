import {
    Controller,
    Post,
    Body,
    Inject,
    BadRequestException,
} from '@nestjs/common';
import { UserRegistrationReq } from './dtos/user-registration.request';
import type { RegisterUserPort } from '../../../application/ports/inbound/register-user.port';
import {
    LOGIN_USER_PORT,
    REGISTER_USER_PORT,
} from '../../../application/tokens';
import { UserRegistrationCmd } from '../../../application/use-cases/user-registration/dtos/register-user.cmd';
import { UserRegistrationResponse } from './dtos/user-registration.response';
import { UserLoginReq } from './dtos/user-login.request';
import type { LoginUserPort } from '../../../application/ports/inbound/login-user.port';
import { LoginUserCmd } from '../../../application/use-cases/user-login/dtos/login-user.cmd';
import { UserLoginResponse } from './dtos/user-login.response';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(REGISTER_USER_PORT)
        private readonly userRegistration: RegisterUserPort,
        @Inject(LOGIN_USER_PORT)
        private readonly loginService: LoginUserPort,
    ) {}

    @Post('register')
    async registration(@Body() req: UserRegistrationReq) {
        if (req.password != req.passwordRepeat) {
            throw new BadRequestException('passwords dont match');
        }
        const cmd = UserRegistrationCmd.create(
            req.username,
            req.email,
            req.password,
        );
        const res = await this.userRegistration.registerUser(cmd);
        return new UserRegistrationResponse(res.username);
    }

    @Post('login')
    async login(@Body() req: UserLoginReq) {
        const cmd = LoginUserCmd.create(req.username, req.password);
        const res = await this.loginService.login(cmd);
        return UserLoginResponse.create(res.token, res.expiresIn);
    }
}
