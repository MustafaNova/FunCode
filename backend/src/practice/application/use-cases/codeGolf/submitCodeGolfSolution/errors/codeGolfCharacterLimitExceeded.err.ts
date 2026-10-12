import { AppError } from '../../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';


export class CodeGolfCharacterLimitExceededError extends AppError {
    constructor() {
        super(
            ERROR_CODES.CODE_GOLF_CHARACTER_LIMIT_EXCEEDED,
            'Character limit exceeded'
        );
    }
}