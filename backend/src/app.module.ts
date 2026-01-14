import { Module } from '@nestjs/common';
import { CompetitiveGameplayModule } from './competitive-gameplay/competitive-gameplay.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [CompetitiveGameplayModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
