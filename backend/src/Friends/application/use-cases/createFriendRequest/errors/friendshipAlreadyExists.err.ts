export class FriendshipAlreadyExistsError extends Error {
    constructor() {
        super('You are already friends');
    }
}