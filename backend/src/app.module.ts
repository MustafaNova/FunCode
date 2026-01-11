import { Module } from '@nestjs/common';
import { CompetitiveGameplayModule } from './competitive-gameplay/competitive-gameplay.module';

@Module({
    imports: [CompetitiveGameplayModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
