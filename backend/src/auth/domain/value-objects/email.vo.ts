import { EmailError } from '../errors/EmailError';

export class Email {
    private constructor(private readonly email: string) {}

    static create(raw: string) {
        if (!raw) {
            throw new EmailError('empty email');
        }

        const value = raw.trim().toLowerCase();

        if (value.length > 254) {
            throw new EmailError('email to long');
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(value)) {
            throw new EmailError('invalid email');
        }

        return new Email(raw);
    }

    static fromPersistence(email: string) {
        return new Email(email);
    }
    get() {
        return this.email;
    }
}
