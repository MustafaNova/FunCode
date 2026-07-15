import { AcceptFriendRequestTransactionParams } from '../../../domain/types/AcceptFriendRequestTransactionParams';

export interface AcceptFriendRequestTransactionPort  {
    acceptFriendRequest(params: AcceptFriendRequestTransactionParams): Promise<void>;
}