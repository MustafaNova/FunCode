import { GetFriendsRes } from '@funcode/shared';

export interface GetFriendsPort {
    getFriends(userId: string): Promise<GetFriendsRes[]>,
}