
export class UserAlreadyInClanError extends Error {
    constructor() {
        super('User is already in clan');
    }
}