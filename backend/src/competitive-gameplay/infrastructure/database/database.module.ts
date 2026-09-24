import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    ARENA_TASK_PROVIDER_PORT,
    BATTLE_REPOSITORY_PORT,
    BUG_HUNTER_TASK_REPOSITORY_PORT,
    CLASSIC_TASK_REPOSITORY_PORT, CODE_GOLF_REPOSITORY_PORT
} from './tokens';
import { BattleRepositoryAdapter } from './battle/battle.repository.adapter';
import { Battle1vs1Entity } from './battle/typeorm/battle1vs1.entity';
import { ClassicTaskRepositoryAdapter } from './tasks/classic.task.repository.adapter';
import { BugHunterTaskRepositoryAdapter } from './tasks/bugHunter.task.repository.adapter';
import { ArenaTaskProviderAdapter } from './tasks/arena.task.provider.adapter';
import { CodeGolfTaskRepositoryAdapter } from './tasks/codeGolf.task.repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([Battle1vs1Entity])],
    providers: [
        {
            provide: BATTLE_REPOSITORY_PORT,
            useClass: BattleRepositoryAdapter
        },
        {
            provide: CLASSIC_TASK_REPOSITORY_PORT,
            useClass: ClassicTaskRepositoryAdapter,
        },
        {
            provide: BUG_HUNTER_TASK_REPOSITORY_PORT,
            useClass: BugHunterTaskRepositoryAdapter
        },
        {
            provide: CODE_GOLF_REPOSITORY_PORT,
            useClass: CodeGolfTaskRepositoryAdapter,
        },
        {
            provide: ARENA_TASK_PROVIDER_PORT,
            useClass: ArenaTaskProviderAdapter,
        }
    ],
    exports: [
        ARENA_TASK_PROVIDER_PORT,
        BATTLE_REPOSITORY_PORT,
        CLASSIC_TASK_REPOSITORY_PORT,
        BUG_HUNTER_TASK_REPOSITORY_PORT,
        CODE_GOLF_REPOSITORY_PORT
    ],
})
export class DatabaseModule {}
