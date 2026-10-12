import { SubmitBugHunterSolutionPort } from '../../../ports/inbound/submitBugHunterSolution.port';
import { SubmitBugHunterSolutionCmd } from './submitBugHunterSolution.cmd';
import { SubmitBugHunterSolResult } from './submitBugHunterSolRes';
import { SubmitPracticeSolutionPort } from '../../../ports/inbound/submitPracticeSolution.port';
import { MAX_BUG_HUNTER_LEVEL } from '../../../../domain/constants/bugHunter.constants';


export class SubmitBugHunterSolutionUC implements SubmitBugHunterSolutionPort {
    constructor(
        private readonly submitPracticeSolutionUC: SubmitPracticeSolutionPort
    ) {}

    async submit(cmd: SubmitBugHunterSolutionCmd): Promise<SubmitBugHunterSolResult> {
        const submitRes = await this.submitPracticeSolutionUC.submit({
            userId: cmd.userId,
            gameMode: 'bug-hunter',
            levelId: cmd.levelId,
            code: cmd.code,
            maxLevel: MAX_BUG_HUNTER_LEVEL,
        })

        return {
            success: submitRes.success
        }
    }
}
