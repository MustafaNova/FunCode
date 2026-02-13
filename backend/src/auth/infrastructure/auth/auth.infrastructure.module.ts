import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN_SERVICE_PORT } from '../../application/tokens';
import { TokenServiceAdapter } from './token-service-adapter';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'test',
            signOptions: {
                expiresIn: '100y',
            },
        }),
    ],
    providers: [
        JwtStrategy,
        { provide: TOKEN_SERVICE_PORT, useClass: TokenServiceAdapter },
    ],
    exports: [TOKEN_SERVICE_PORT, JwtStrategy],
})
export class AuthInfrastructureModule {}
