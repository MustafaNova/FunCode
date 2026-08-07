import { GetBugHunterLevelUC } from '../../application/use-cases/getBugHunterLevel/getBugHunterLevel.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type BugHunterLevelRepoPort } from '../../application/ports/outbound/bugHunterLevel.repo.port';
import { type BugHunterProgressRepoPort } from '../../application/ports/outbound/bugHunterProgress.repo.port';
import { BUG_HUNTER_LEVEL_REPO_PORT, BUG_HUNTER_PROGRESS_REPO_PORT } from '../tokens';

@Injectable()
export class GetBugHunterLevelService extends GetBugHunterLevelUC {
    constructor(
        @Inject(BUG_HUNTER_LEVEL_REPO_PORT)
        bugHunterLevelRepo: BugHunterLevelRepoPort,
        @Inject(BUG_HUNTER_PROGRESS_REPO_PORT)
        bugHunterProgressRepo: BugHunterProgressRepoPort,

    ) {
        super(bugHunterLevelRepo, bugHunterProgressRepo);
    }
}