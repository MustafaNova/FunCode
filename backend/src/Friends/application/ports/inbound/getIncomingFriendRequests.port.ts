import { IncomingFriendRequestRes } from '@funcode/shared';


export interface GetIncomingFriendRequestsPort {
    getIncomingFriendRequests(receiverId: string): Promise<IncomingFriendRequestRes[]>;
}
