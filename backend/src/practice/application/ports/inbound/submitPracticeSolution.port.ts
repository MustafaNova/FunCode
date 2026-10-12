import { SubmitPracticeSolutionCmd } from '../../use-cases/shared/submitPracticeSolution/submitPracticeSolution.cmd';
import { SubmitPracticeSolutionResult } from '../../use-cases/shared/submitPracticeSolution/submitPracticeSolution.res';

export interface SubmitPracticeSolutionPort {
    submit(cmd: SubmitPracticeSolutionCmd): Promise<SubmitPracticeSolutionResult>;
}