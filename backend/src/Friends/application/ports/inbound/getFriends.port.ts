import { GetFriendsRes } from '../../use-cases/getFriends/getFriends.res';

export interface GetFriendsPort {
    getFriends(userId: string): GetFriendsRes[],
}