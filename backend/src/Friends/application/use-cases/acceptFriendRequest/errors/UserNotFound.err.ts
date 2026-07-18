export class UserNotFoundError extends Error {
    constructor(userId: string) {
        super(`User with id "${userId}" was not found.`);
    }
}