import { SubmitCodeGolfSolutionPort } from '../../../ports/inbound/submitCodeGolfSolution.port';
import { SubmitPracticeSolutionPort } from '../../../ports/inbound/submitPracticeSolution.port';
import { PracticeLevelRepoPort } from '../../../ports/outbound/practiceLevelRepo.port';
import { SubmitCodeGolfSolutionCmd } from './submitCodeGolfSolution.cmd';
import { SubmitCodeGolfSolutionResult } from './submitCodeGolfSolution.res';
import { PracticeLevelNotFoundError } from '../../shared/getPracticeLevel/errors/practiceLevelNotFound.err';
import { CodeGolfCharacterLimitExceededError } from './errors/codeGolfCharacterLimitExceeded.err';
import { MAX_CODE_GOLF_LEVEL } from '../../../../domain/constants/codeGolf.constants';


export class SubmitCodeGolfSolutionUC implements SubmitCodeGolfSolutionPort {
    constructor(
        private readonly submitPracticeSolUC: SubmitPracticeSolutionPort,
        private readonly practiceLevelRepo: PracticeLevelRepoPort
    ) {}


    async submit(cmd: SubmitCodeGolfSolutionCmd): Promise<SubmitCodeGolfSolutionResult> {
        const level = this.practiceLevelRepo.getById('code-golf', cmd.levelId);
        if (level === null) {
            throw new PracticeLevelNotFoundError();
        }

        if (cmd.code.length > level.maxCharacters) {
            throw new CodeGolfCharacterLimitExceededError();
        }

        const submitRes = await this.submitPracticeSolUC.submit({
            userId: cmd.userId,
            gameMode: 'code-golf',
            levelId: cmd.levelId,
            code: cmd.code,
            maxLevel: MAX_CODE_GOLF_LEVEL,
            }
        )

        return {
            success: submitRes.success
        }

    }
}