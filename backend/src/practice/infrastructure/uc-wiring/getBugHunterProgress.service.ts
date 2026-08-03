import { GetBugHunterProgressUC } from '../../application/use-cases/getBugHunterProgress/getBugHunterProgress.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type BugHunterProgressRepoPort } from '../../application/ports/outbound/bugHunterProgress.repo.port';
import { BUG_HUNTER_PROGRESS_REPO_PORT } from '../tokens';

@Injectable()
export class GetBugHunterProgressService extends GetBugHunterProgressUC {
    constructor(
        @Inject(BUG_HUNTER_PROGRESS_REPO_PORT)
        bugHunterProgressRepo: BugHunterProgressRepoPort
    ) {
        super(bugHunterProgressRepo);
    }
}