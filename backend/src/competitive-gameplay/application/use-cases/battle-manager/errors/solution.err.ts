import { ErrorCodes } from '../../../../../common/error.codes';

export class SolutionError extends Error {
    code: number;
    public constructor() {
        super('undefined solution');
        this.code = ErrorCodes.UNDEFINED_SOLUTION;
    }
}
