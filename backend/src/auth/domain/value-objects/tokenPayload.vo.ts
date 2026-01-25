import { Username } from './username.vo';
import { UserId } from './userId.vo';

export class TokenPayload {
    constructor(
        public readonly userId: UserId,
        public readonly username: Username,
    ) {}

    static create(userId: UserId, username: Username) {
        return new TokenPayload(userId, username);
    }
}
