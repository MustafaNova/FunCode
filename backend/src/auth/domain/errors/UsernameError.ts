import { DomainError } from '../../../common/errors/DomainError';

export class UsernameError extends DomainError {
    constructor(message: string) {
        super(message);
    }
}
