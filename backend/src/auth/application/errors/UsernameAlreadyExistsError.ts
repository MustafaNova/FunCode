import { AppError } from './AppError';

export class UsernameAlreadyExistsError extends AppError {
    constructor() {
        super('Username already exists');
    }
}
