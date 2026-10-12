import { Module } from '@nestjs/common';
import { PRACTICE_LEVEL_REPO_PORT } from '../tokens';
import { PracticeLevelRepoAdapter } from './practiceLevelRepo.adapter';


@Module({
    providers: [
        {
            provide: PRACTICE_LEVEL_REPO_PORT,
            useClass: PracticeLevelRepoAdapter,
        }
    ],
    exports: [PRACTICE_LEVEL_REPO_PORT]
})
export class PracticeLevelRepoModule {}