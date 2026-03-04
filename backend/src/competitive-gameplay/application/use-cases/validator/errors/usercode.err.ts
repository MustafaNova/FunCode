import { ErrorCodes } from '../../../../../common/error.codes';

export class UserCodeError extends Error {
    code: number;
    public constructor(err: string) {
        super(`Error with UserCode: ${err}`);
        this.code = ErrorCodes.USER_CODE_ERROR;
    }
}
