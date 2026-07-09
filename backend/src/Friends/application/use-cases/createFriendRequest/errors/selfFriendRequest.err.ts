export class SelfFriendRequestError extends Error {
    constructor() {
        super('You cannot send a friendRequest to yourself');
    }
}