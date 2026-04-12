import { AppError } from '../../../../../common/errors/AppError';

export class InvalidCredentialsError extends AppError {
    constructor() {
        super('Invalid credentials');
    }
}
