import { AppError } from '../../../errors/AppError';

export class UsernameAlreadyExistsError extends AppError {
    constructor() {
        super('Username already exists');
    }
}
