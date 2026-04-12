import { AppError } from '../../../common/errors/AppError';

export class NotFoundException extends AppError {
    constructor() {
        super('ProgressId doesnt exists');
    }
}
