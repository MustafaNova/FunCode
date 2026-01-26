import { User } from '../../../../domain/entitys/user';

export class RegisterUserResult {
    private constructor(public readonly username: string) {}

    static from(user: User) {
        return new RegisterUserResult(user.username.get());
    }
}
