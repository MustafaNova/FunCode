import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitiveGameplayModule } from './competitive-gameplay/competitive-gameplay.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LearningProgressionModule } from './Learning-progression/learning-progression.module';
import { ConfigModule } from '@nestjs/config';
import { ClansModule } from './clans/clans.module';

@Module({
    imports: [
        CompetitiveGameplayModule,
        AuthModule,
        LearningProgressionModule,
        ClansModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env['DATABASE_URL'],
            autoLoadEntities: true,
            synchronize: true,
        }),
        EventEmitterModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env', '../.env'],
        })
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
