import { UsernameError } from '../errors/UsernameError';

export class Username {
    private constructor(private readonly username: string) {}

    static create(raw: string) {
        const v = raw?.trim();

        if (!v) throw new UsernameError('empty username');
        if (v.length < 3) throw new UsernameError('username is to short');
        if (v.length > 30) throw new UsernameError('username is to long');

        const ok = /^[a-zA-Z0-9._-]+$/.test(v);
        if (!ok) throw new UsernameError('invalid characters in username');

        return new Username(v);
    }

    static fromPersistence(username: string) {
        return new Username(username);
    }

    get() {
        return this.username;
    }
}
