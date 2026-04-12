import { DomainError } from '../../../common/errors/DomainError';

export class PasswordError extends DomainError {
    constructor(message: string) {
        super(message);
    }
}
