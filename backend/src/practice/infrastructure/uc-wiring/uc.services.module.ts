import { Module } from '@nestjs/common';
import { GET_BUG_HUNTER_PROGRESS_PORT } from '../tokens';
import { GetBugHunterProgressService } from './getBugHunterProgress.service';
import { BugHunterProgressRepoModule } from '../bugHunterProgressRepo/bugHunterProgressRepo.module';

@Module({
    imports: [BugHunterProgressRepoModule],
    providers: [
        {
            provide: GET_BUG_HUNTER_PROGRESS_PORT,
            useClass: GetBugHunterProgressService,
        }
    ],
    exports: [GET_BUG_HUNTER_PROGRESS_PORT]
})
export class UCServicesModule {}