import { AppError } from './AppError';

export class EmailAlreadyExistsError extends AppError {
    constructor() {
        super('Email already exists');
    }
}
