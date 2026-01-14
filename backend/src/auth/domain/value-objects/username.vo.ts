export class Username {
    private constructor(private readonly username: string) {}

    static create(raw: string) {
        const v = raw?.trim();

        if (!v) throw new Error('empty username');
        if (v.length < 3) throw new Error('short username');
        if (v.length > 30) throw new Error('long username');

        const ok = /^[a-zA-Z0-9._-]+$/.test(v);
        if (!ok) throw new Error('invalid characters');

        return new Username(v);
    }

    get() {
        return this.username;
    }
}
