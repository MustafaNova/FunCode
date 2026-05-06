import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerProgressEntity } from './entities/player.progress.entity';
import { PlayerActiveScreenEntity } from './entities/player.active.screen.entity';
import {
    ACTIVE_SCREEN_REPOSITORY_PORT,
    LEVEL_PROGRESS_REPO_PORT,
    LEVEL_REPOSITORY_PORT,
} from './tokens';
import { ActiveScreenRepositoryAdapter } from './adapters/activeScreen.repository.adapter';
import { LevelRepositoryAdapter } from './adapters/level.repository.adapter';
import { LevelProgressionRepoAdapter } from './adapters/levelProgression.repo.adapter';

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
        {
            provide: LEVEL_REPOSITORY_PORT,
            useClass: LevelRepositoryAdapter,
        },
        {
            provide: LEVEL_PROGRESS_REPO_PORT,
            useClass: LevelProgressionRepoAdapter,
        },
    ],
    exports: [
        ACTIVE_SCREEN_REPOSITORY_PORT,
        LEVEL_REPOSITORY_PORT,
        LEVEL_PROGRESS_REPO_PORT,
    ],
})
export class DatabaseModule {}
