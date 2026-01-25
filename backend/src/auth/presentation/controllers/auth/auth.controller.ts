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
import { UserRegistrationCmd } from '../../../application/use-cases/user-registration/register-user.cmd';
import { UserRegistrationResponse } from './dtos/user-registration.response';
import { UserLoginReq } from './dtos/user-login.request';
import type { LoginUserPort } from '../../../application/ports/inbound/login-user.port';

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
        const cmd = new UserRegistrationCmd(
            req.username,
            req.email,
            req.password,
        );
        const res = await this.userRegistration.registerUser(cmd);
        return new UserRegistrationResponse(res.username);
    }

    @Post('login')
    async login(@Body() req: UserLoginReq) {

    }
}
