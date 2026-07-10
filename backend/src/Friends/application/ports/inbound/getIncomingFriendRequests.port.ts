import {
    IncomingFriendRequestResponse
} from '../../use-cases/getIncomingFriendRequests/incomingFriendRequest.response';

export interface GetIncomingFriendRequestsPort {
    getIncomingFriendRequests(receiverId: string): IncomingFriendRequestResponse[];
}
