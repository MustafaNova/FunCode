export class FriendRequestNotFoundError extends Error {
    constructor(friendRequestId: string) {
        super( `Friend request with id ${friendRequestId} was not found.`);
    }
}