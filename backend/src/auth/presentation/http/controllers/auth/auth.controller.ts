import {
    Controller,
    Post,
    Body,
    Inject,
    BadRequestException,
    Res,
    Get,
    UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { UserRegistrationReq } from './dtos/user-registration.request';
import type { RegisterUserPort } from '../../../../application/ports/inbound/register-user.port';
import {
    GET_CURRENT_USER_PORT,
    LOGIN_USER_PORT,
    REGISTER_USER_PORT,
} from '../../../../infrastructure/uc-wiring/tokens';
import { UserRegistrationCmd } from '../../../../application/use-cases/user-registration/dtos/register-user.cmd';
import { UserRegistrationResponse } from './dtos/user-registration.response';
import { UserLoginReq } from './dtos/user-login.request';
import type { LoginUserPort } from '../../../../application/ports/inbound/login-user.port';
import { LoginUserCmd } from '../../../../application/use-cases/user-login/dtos/login-user.cmd';
import { UserLoginResponse } from './dtos/user-login.response';
import { AuthUser, UserPayload } from '../../../../../common/utils/user-payload.decorator';
import { type GetCurrentUserPort } from '../../../../application/ports/inbound/GetCurrentUser.port';
import { MeRes } from '@funcode/shared';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(REGISTER_USER_PORT)
        private readonly userRegistration: RegisterUserPort,
        @Inject(LOGIN_USER_PORT)
        private readonly loginService: LoginUserPort,
        @Inject(GET_CURRENT_USER_PORT)
        private readonly currentUserService: GetCurrentUserPort,
    ) {}

    isProduction = process.env.NODE_ENV === 'production';

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
    async login(@Body() req: UserLoginReq, @Res() res: Response) {
        console.log("login controller");
        const cmd = LoginUserCmd.create(req.username, req.password);
        const loginRes = await this.loginService.login(cmd);

        res.cookie('token', loginRes.token, {
            httpOnly: true,
            secure: this.isProduction,
            sameSite: this.isProduction ? 'none' : 'lax',
        });
        return res.json(
            UserLoginResponse.create(loginRes.token, loginRes.expiresIn, loginRes.username, loginRes.hasCompletedOnboarding),
        );
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async me(@UserPayload() user: AuthUser): Promise<MeRes> {
        console.log('started me');
        const res = await this.currentUserService.me(user.username);
        if (!res.id) {
            throw new Error();
        }

        return {
            id: res.id.get(),
            username: res.username.get(),
            email: res.email.get(),
            hasCompletedOnboarding: res.hasCompletedOnboarding,
            token: user.token
        }
    }

}
