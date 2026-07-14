export class FriendRequestAccessDeniedError extends Error {
    constructor() {
        super('You are not allowed to accept this friend request.');
    }
}