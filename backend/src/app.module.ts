import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitiveGameplayModule } from './competitive-gameplay/competitive-gameplay.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LearningProgressionModule } from './Learning-progression/learning-progression.module';
import { ConfigModule } from '@nestjs/config';
import { ClansModule } from './clans/clans.module';
import { FriendsModule } from './Friends/friends.module';
import { PracticeModule } from './practice/practice.module';

@Module({
    imports: [
        CompetitiveGameplayModule,
        AuthModule,
        LearningProgressionModule,
        ClansModule,
        FriendsModule,
        PracticeModule,
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
