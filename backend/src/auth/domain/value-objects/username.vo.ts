import { BadRequestException } from '@nestjs/common';

export class Username {
    private constructor(private readonly username: string) {}

    static create(raw: string) {
        const v = raw?.trim();

        if (!v) throw new BadRequestException('empty username');
        if (v.length < 3) throw new BadRequestException('username is to short');
        if (v.length > 30) throw new BadRequestException('username is to long');

        const ok = /^[a-zA-Z0-9._-]+$/.test(v);
        if (!ok)
            throw new BadRequestException('invalid characters in username');

        return new Username(v);
    }

    get() {
        return this.username;
    }
}
