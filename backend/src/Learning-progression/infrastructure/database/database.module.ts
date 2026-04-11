import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerProgressEntity } from './entities/player.progress.entity';
import { PlayerActiveScreenEntity } from './entities/player.active.screen.entity';
import { ACTIVE_SCREEN_REPOSITORY_PORT } from './tokens';
import { ActiveScreenRepositoryAdapter } from './activeScreen.repository.adapter';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PlayerProgressEntity,
            PlayerActiveScreenEntity,
        ]),
    ],
    providers: [
        {
            provide: ACTIVE_SCREEN_REPOSITORY_PORT,
            useClass: ActiveScreenRepositoryAdapter,
        },
    ],
    exports: [ACTIVE_SCREEN_REPOSITORY_PORT],
})
export class DatabaseModule {}
