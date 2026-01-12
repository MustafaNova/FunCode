export class Email {
    constructor(private readonly email: string) {}

    static create(raw: string) {
        if (!raw) {
            throw new Error();
        }

        const value = raw.trim().toLowerCase();

        if (value.length > 254) {
            throw new Error();
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(value)) {
            throw new Error();
        }

        return new Email(raw);
    }

    get() {
        return this.email;
    }
}
