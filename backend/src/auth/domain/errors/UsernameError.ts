import { DomainError } from './DomainError';

export class UsernameError extends DomainError {
    constructor(message: string) {
        super(message);
    }
}
