import { BadRequestException } from '@nestjs/common';

export class Email {
    private constructor(private readonly email: string) {}

    static create(raw: string) {
        if (!raw) {
            throw new BadRequestException('empty email');
        }

        const value = raw.trim().toLowerCase();

        if (value.length > 254) {
            throw new BadRequestException('email address is to long');
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(value)) {
            throw new BadRequestException('invalid email address');
        }

        return new Email(raw);
    }

    get() {
        return this.email;
    }
}
