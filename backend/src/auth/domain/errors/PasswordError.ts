import { DomainError } from './DomainError';

export class PasswordError extends DomainError {
    constructor(message: string) {
        super(message);
    }
}
