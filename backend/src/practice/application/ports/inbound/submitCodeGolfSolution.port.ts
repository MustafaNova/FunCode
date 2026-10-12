import { SubmitCodeGolfSolutionCmd } from '../../use-cases/codeGolf/submitCodeGolfSolution/submitCodeGolfSolution.cmd';
import {
    SubmitCodeGolfSolutionResult
} from '../../use-cases/codeGolf/submitCodeGolfSolution/submitCodeGolfSolution.res';

export interface SubmitCodeGolfSolutionPort {
    submit(cmd: SubmitCodeGolfSolutionCmd): Promise<SubmitCodeGolfSolutionResult>
}