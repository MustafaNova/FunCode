import { hash } from 'bcrypt';
import { PasswordError } from '../errors/PasswordError';

export class Password {
    private constructor(private readonly hashed: string) {}

    static async create(raw: string) {
        if (raw.length < 8) {
            throw new PasswordError('password to short');
        }

        const hashed = await hash(raw, 12);
        return new Password(hashed);
    }

    get() {
        return this.hashed;
    }
}
