export class FriendRequestAlreadyExistsError extends Error {
    constructor() {
        super('CreateFriendRequest already exists');
    }
}