export interface DeleteFriendPort {
    deleteFriend(firstUserId: string, secondUserId: string): Promise<void>;
}