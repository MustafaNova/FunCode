import { Username } from '../value-objects/username.vo';
import { Password } from '../value-objects/password.vo';
import { Email } from '../value-objects/email.vo';
import { UserId } from '../value-objects/userId.vo';

export class User {
    constructor(
        public readonly id: UserId | null,
        public readonly username: Username,
        public readonly email: Email,
        public readonly password: Password,
    ) {}

    async verifyPassword(raw: string) {
        return this.password.matches(raw);
    }
}
