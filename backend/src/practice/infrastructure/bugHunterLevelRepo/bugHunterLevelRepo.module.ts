import { Module } from '@nestjs/common';
import { BUG_HUNTER_LEVEL_REPO_PORT } from '../tokens';
import { BugHunterLevelRepoAdapter } from './bugHunterLevelRepo.adapter';


@Module({
    providers: [
        {
            provide: BUG_HUNTER_LEVEL_REPO_PORT,
            useClass: BugHunterLevelRepoAdapter,
        }
    ],
    exports: [BUG_HUNTER_LEVEL_REPO_PORT]
})
export class BugHunterLevelRepoModule {}