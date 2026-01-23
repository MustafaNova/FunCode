import {
    Controller,
    Post,
    Body,
    Inject,
    BadRequestException,
} from '@nestjs/common';
import { UserRegistrationReq } from './dtos/user-registration.request';
import type { RegisterUserPort } from '../../../application/ports/inbound/register-user.port';
import { REGISTER_USER_PORT } from '../../../application/tokens';
import { UserRegistrationCmd } from '../../../application/use-cases/user-registration/register-user.cmd';
import { UserRegistrationResponse } from './dtos/user-registration.response';

@Controller('registration')
export class RegistrationController {
    constructor(
        @Inject(REGISTER_USER_PORT)
        private readonly userRegistration: RegisterUserPort,
    ) {}
    @Post()
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
}
