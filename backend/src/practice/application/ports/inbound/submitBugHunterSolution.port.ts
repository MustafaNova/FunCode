import { SubmitBugHunterSolutionCmd } from '../../use-cases/submitBugHunterSolution/submitBugHunterSolution.cmd';

export interface SubmitBugHunterSolutionPort {
    submit(cmd: SubmitBugHunterSolutionCmd): Promise<boolean>
}