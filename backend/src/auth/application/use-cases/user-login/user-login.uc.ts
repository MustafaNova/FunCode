import { LoginUserPort } from '../../ports/inbound/login-user.port';
import { LoginUserCmd } from './dtos/login-user.cmd';
import { LoginUserRes } from './dtos/login-user.res';
import { Username } from '../../../domain/value-objects/username.vo';
import type { UserRepositoryPort } from '../../ports/outbound/user-repository.port';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';
import type { TokenServicePort } from '../../ports/outbound/token-service.port';
import { UserId } from '../../../domain/value-objects/userId.vo';
import { TokenPayload } from '../../../domain/value-objects/tokenPayload.vo';

export class UserLoginUC implements LoginUserPort {
    constructor(
        private readonly userRepo: UserRepositoryPort,
        private readonly tokenService: TokenServicePort,
    ) {}

    async login(loginData: LoginUserCmd): Promise<LoginUserRes> {
        const loginUsername = Username.create(loginData.username);
        const user = await this.userRepo.findByUsername(loginUsername);

        if (!user) {
            console.log('username not found for login');
            throw new InvalidCredentialsError();
        }

        const correctPassword = await user.verifyPassword(loginData.password);
        if (!correctPassword) {
            console.log('wrong password for login');
            throw new InvalidCredentialsError();
        }

        const token = await this.tokenService.sign(
            TokenPayload.create(user.id as UserId, loginUsername),
        );

        return LoginUserRes.create(token.token, token.expiresIn);
    }
}
