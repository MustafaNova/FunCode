import { AppError } from '../../../errors/AppError';

export class EmailAlreadyExistsError extends AppError {
    constructor() {
        super('Email already exists');
    }
}
