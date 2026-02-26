import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { UCServicesModule } from '../../infrastructure/uc-wiring/uc.services.module';

@Module({
    imports: [UCServicesModule],
    controllers: [AuthController],
})
export class HttpModule {}
