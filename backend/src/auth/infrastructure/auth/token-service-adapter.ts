import { Injectable } from '@nestjs/common';
import { TokenServicePort } from '../../application/ports/outbound/token-service.port';
import { AccessToken } from '../../domain/value-objects/accessToken.vo';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../../domain/value-objects/tokenPayload.vo';

@Injectable()
export class TokenServiceAdapter implements TokenServicePort {
    constructor(private readonly jwt: JwtService) {}

    async sign(payload: TokenPayload): Promise<AccessToken> {
        const token = await this.jwt.signAsync({
            userId: payload.userId.get(),
            username: payload.username.get(),
        });

        const expiresIn = 9999999999;
        return AccessToken.create(token, expiresIn);
    }
}
