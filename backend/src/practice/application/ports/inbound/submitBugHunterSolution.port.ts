import { SubmitBugHunterSolutionCmd } from '../../use-cases/submitBugHunterSolution/submitBugHunterSolution.cmd';
import {
    SubmitBugHunterSolResult
} from '../../use-cases/submitBugHunterSolution/submitBugHunterSolRes';

export interface SubmitBugHunterSolutionPort {
    submit(cmd: SubmitBugHunterSolutionCmd): Promise<SubmitBugHunterSolResult>
}