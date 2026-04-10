import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitiveGameplayModule } from './competitive-gameplay/competitive-gameplay.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LearningProgressionModule } from './Learning-progression/learning-progression.module';

@Module({
    imports: [
        CompetitiveGameplayModule,
        AuthModule,
        LearningProgressionModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true,
        }),
        EventEmitterModule.forRoot(),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
