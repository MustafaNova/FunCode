import { AppError } from '../../../../../common/errors/AppError';

export class UsernameAlreadyExistsError extends AppError {
    constructor() {
        super('Username already exists');
    }
}
