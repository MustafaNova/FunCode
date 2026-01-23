import { DomainError } from './DomainError';

export class EmailError extends DomainError {
    constructor(message: string) {
        super(message);
    }
}
