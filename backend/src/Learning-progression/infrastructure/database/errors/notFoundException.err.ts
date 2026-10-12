import { ERROR_CODES } from '@funcode/shared';
import { AppError } from '../../../../common/app.error';

export class NotFoundProgressIdException extends AppError {
    constructor() {
        super(
            ERROR_CODES.NOT_FOUND_PROGRESS_ID,
            'ProgressId doesnt exists'
        );
    }
}
