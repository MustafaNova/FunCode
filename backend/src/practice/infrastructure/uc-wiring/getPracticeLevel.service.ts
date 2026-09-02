import { GetPracticeLevelUC } from '../../application/use-cases/shared/getPracticeLevel/getPracticeLevel.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type PracticeLevelRepoPort } from '../../application/ports/outbound/practiceLevelRepo.port';
import { type PracticeProgressRepoPort } from '../../application/ports/outbound/practiceProgress.repo.port';
import { PRACTICE_LEVEL_REPO_PORT, PRACTICE_PROGRESS_REPO_PORT } from '../tokens';

@Injectable()
export class GetPracticeLevelService extends GetPracticeLevelUC {
    constructor(
        @Inject(PRACTICE_LEVEL_REPO_PORT)
        practiceLevelRepo: PracticeLevelRepoPort,
        @Inject(PRACTICE_PROGRESS_REPO_PORT)
        practiceProgressRepo: PracticeProgressRepoPort,
    ) {
        super(practiceLevelRepo, practiceProgressRepo);
    }
}