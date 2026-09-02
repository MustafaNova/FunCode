import { SubmitBugHunterSolutionCmd } from '../../use-cases/bugHunter/submitBugHunterSolution/submitBugHunterSolution.cmd';
import {
    SubmitBugHunterSolResult
} from '../../use-cases/bugHunter/submitBugHunterSolution/submitBugHunterSolRes';

export interface SubmitBugHunterSolutionPort {
    submit(cmd: SubmitBugHunterSolutionCmd): Promise<SubmitBugHunterSolResult>
}