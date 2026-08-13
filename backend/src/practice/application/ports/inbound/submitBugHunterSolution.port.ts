import { SubmitBugHunterSolutionCmd } from '../../use-cases/submitBugHunterSolution/submitBugHunterSolution.cmd';
import { SubmitBugHunterSolRes } from '../../use-cases/submitBugHunterSolution/submitBugHunterSolRes';

export interface SubmitBugHunterSolutionPort {
    submit(cmd: SubmitBugHunterSolutionCmd): Promise<SubmitBugHunterSolRes>
}