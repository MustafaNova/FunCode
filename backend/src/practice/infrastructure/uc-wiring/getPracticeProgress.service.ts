import { GetPracticeProgressUC } from '../../application/use-cases/shared/getPracticeProgress/getPracticeProgress.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type PracticeProgressRepoPort } from '../../application/ports/outbound/practiceProgress.repo.port';
import { PRACTICE_PROGRESS_REPO_PORT } from '../tokens';

@Injectable()
export class GetPracticeProgressService extends GetPracticeProgressUC {
    constructor(
        @Inject(PRACTICE_PROGRESS_REPO_PORT)
        practiceProgressRepo: PracticeProgressRepoPort
    ) {
        super(practiceProgressRepo);
    }
}