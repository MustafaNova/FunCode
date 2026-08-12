import { AppError } from '../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class UnsupportedLanguageError extends AppError {
    constructor() {
        super(
            ERROR_CODES.UNSUPPORTED_LANGUAGE,
            'Unsupported programming language'
        );
    }
}