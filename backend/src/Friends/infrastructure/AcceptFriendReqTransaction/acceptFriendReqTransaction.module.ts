import { Module } from '@nestjs/common';
import { AcceptFriendReqTransactionAdapter } from './acceptFriendReqTransaction.adapter';
import { FRIEND_REQ_TX_PORT } from '../tokens';


@Module({
    providers: [
        {
            provide: FRIEND_REQ_TX_PORT,
            useClass: AcceptFriendReqTransactionAdapter
        }
    ],
    exports: [FRIEND_REQ_TX_PORT],
})
export class AcceptFriendReqTransactionModule {}