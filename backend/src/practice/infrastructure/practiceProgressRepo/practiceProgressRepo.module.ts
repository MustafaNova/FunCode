import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticeProgressEntity } from './practiceProgress.entity';
import { PRACTICE_PROGRESS_REPO_PORT } from '../tokens';
import { PracticeProgressRepoAdapter } from './practiceProgressRepo.adapter';


@Module({
    imports: [TypeOrmModule.forFeature([PracticeProgressEntity])],
    providers: [
        {
            provide: PRACTICE_PROGRESS_REPO_PORT,
            useClass: PracticeProgressRepoAdapter,
        }
    ],
    exports: [PRACTICE_PROGRESS_REPO_PORT]
})
export class PracticeProgressRepoModule {}