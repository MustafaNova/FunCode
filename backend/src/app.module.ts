import { Module } from '@nestjs/common';
import { CompetitiveGameplayModule } from './competitive-gameplay/competitive-gameplay.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        CompetitiveGameplayModule,
        AuthModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'my_app',
            autoLoadEntities: true,
            synchronize: false,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
