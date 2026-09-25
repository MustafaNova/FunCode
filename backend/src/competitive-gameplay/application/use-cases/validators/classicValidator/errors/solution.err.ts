import { AppError } from '../../../../../../common/app.error';
import { ERROR_CODES } from '@funcode/shared';

export class SolutionError extends AppError {
    public constructor() {
        super(
            ERROR_CODES.SOLUTION_REQUIRED,
            'Solution is required'
        );
    }
}
