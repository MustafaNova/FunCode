export class FriendshipNotFoundError extends Error {
    constructor() {
        super('Friendship not found');
    }
}