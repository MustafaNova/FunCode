import { hash } from 'bcrypt';

export class Password {
    private constructor(private readonly hashed: string) {}

    static async create(raw: string) {
        if (raw.length < 8) {
            throw new Error('password to short');
        }

        const hashed = await hash(raw, 12);
        return new Password(hashed);
    }

    get() {
        return this.hashed;
    }
}
