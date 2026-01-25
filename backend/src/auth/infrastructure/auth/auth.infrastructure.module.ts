import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN_SERVICE_PORT } from '../../application/tokens';
import { TokenServiceAdapter } from './token-service-adapter';

@Module({
    imports: [
        JwtModule.register({
            secret: 'test',
            signOptions: {
                expiresIn: '1h',
            },
        }),
    ],
    providers: [{ provide: TOKEN_SERVICE_PORT, useClass: TokenServiceAdapter }],
    exports: [TOKEN_SERVICE_PORT],
})
export class AuthInfrastructureModule {}
