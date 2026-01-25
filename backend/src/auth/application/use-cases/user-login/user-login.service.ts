import { Inject, Injectable } from '@nestjs/common';
import { LoginUserPort } from '../../ports/inbound/login-user.port';
import { LoginUserCmd } from './login-user.cmd';
import { LoginUserRes } from './login-user.res';
import { Username } from '../../../domain/value-objects/username.vo';
import type { UserRepositoryPort } from '../../ports/outbound/user-repository.port';
import { TOKEN_SERVICE_PORT, USER_REPOSITORY_PORT } from '../../tokens';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';
import { Password } from '../../../domain/value-objects/password.vo';
import type { TokenServicePort } from '../../ports/outbound/token-service.port';
import { UserId } from '../../../domain/value-objects/userId.vo';
import { TokenPayload } from '../../../domain/value-objects/tokenPayload.vo';

@Injectable()
export class UserLoginService implements LoginUserPort {
    constructor(
        @Inject(USER_REPOSITORY_PORT)
        private readonly userRepo: UserRepositoryPort,
        @Inject(TOKEN_SERVICE_PORT)
        private readonly tokenService: TokenServicePort,
    ) {}

    async login(loginData: LoginUserCmd): Promise<LoginUserRes> {
        const loginUsername = Username.create(loginData.username);
        const user = await this.userRepo.findByUsername(loginUsername);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const loginPassword = await Password.create(loginData.password);
        if (!user.verifyPassword(loginPassword)) {
            throw new InvalidCredentialsError();
        }

        const token = await this.tokenService.sign(
            TokenPayload.create(user.id as UserId, loginUsername),
        );

        return LoginUserRes.create(token.token, token.expiresIn);
    }
}
