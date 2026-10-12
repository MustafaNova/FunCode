import { AppError } from '../../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';


export class PracticeLevelNotSubmittableError extends AppError {
    constructor() {
        super(
            ERROR_CODES.PRACTICE_LEVEL_NOT_SUBMITTABLE,
            'You cant submit this level'
        );
    }
}