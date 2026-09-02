import { Inject, Injectable } from '@nestjs/common';
import {
    SubmitBugHunterSolutionUC
} from '../../application/use-cases/bugHunter/submitBugHunterSolution/submitBugHunterSolution.uc';
import {
    SUBMIT_PRACTICE_SOLUTION_PORT
} from '../tokens';
import { type SubmitPracticeSolutionPort } from '../../application/ports/inbound/submitPracticeSolution.port';


@Injectable()
export class SubmitBugHunterSolutionService extends SubmitBugHunterSolutionUC {
    constructor(
        @Inject(SUBMIT_PRACTICE_SOLUTION_PORT)
        submitPracticeSolution: SubmitPracticeSolutionPort
    ) {
        super(submitPracticeSolution);
    }
}