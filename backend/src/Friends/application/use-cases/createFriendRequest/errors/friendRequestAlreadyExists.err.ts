export class FriendRequestAlreadyExistsError extends Error {
    constructor() {
        super('FriendRequest already exists');
    }
}