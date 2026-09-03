import {
    SubmitCodeGolfSolutionUC
} from '../../application/use-cases/codeGolf/submitCodeGolfSolution/submitCodeGolfSolution.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type SubmitPracticeSolutionPort } from '../../application/ports/inbound/submitPracticeSolution.port';
import { type PracticeLevelRepoPort } from '../../application/ports/outbound/practiceLevelRepo.port';
import { PRACTICE_LEVEL_REPO_PORT, SUBMIT_PRACTICE_SOLUTION_PORT } from '../tokens';

@Injectable()
export class SubmitCodeGolfSolutionService extends SubmitCodeGolfSolutionUC {
    constructor(
        @Inject(SUBMIT_PRACTICE_SOLUTION_PORT)
        submitPracticeSolUC: SubmitPracticeSolutionPort,
        @Inject(PRACTICE_LEVEL_REPO_PORT)
        practiceLevelRepo: PracticeLevelRepoPort
    ) {
        super(submitPracticeSolUC, practiceLevelRepo);
    }
}