import { Username } from '../value-objects/username.vo';
import { Password } from '../value-objects/password.vo';
import { Email } from '../value-objects/email.vo';

export class User {
    constructor(
        public readonly username: Username,
        public readonly email: Email,
        public readonly password: Password,
    ) {}
}
