import { Module } from '@nestjs/common';
import { ApplicationModule } from '../../application/application.module';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
    imports: [ApplicationModule],
    controllers: [AuthController],
})
export class HttpModule {}
