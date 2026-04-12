import { DomainError } from '../../../common/errors/DomainError';

export class EmailError extends DomainError {
    constructor(message: string) {
        super(message);
    }
}
