import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BugHunterProgressEntity } from './bugHunterProgress.entity';
import { BUG_HUNTER_PROGRESS_REPO_PORT } from '../tokens';
import { BugHunterProgressRepoAdapter } from './bugHunterProgressRepo.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([BugHunterProgressEntity])],
    providers: [
        {
            provide: BUG_HUNTER_PROGRESS_REPO_PORT,
            useClass: BugHunterProgressRepoAdapter,
        }
    ],
    exports: [BUG_HUNTER_PROGRESS_REPO_PORT]
})
export class BugHunterProgressRepoModule {}