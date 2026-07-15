import { Module } from '@nestjs/common';
import { UcServicesModule } from './uc-wiring/uc.services.module';
import { UserLookUpModule } from './UserLookUp/userLookUp.module';
import { FriendRequestRepoModule } from './FriendRequestRepo/friendRequestRepo.module';
import { FriendShipRepoModule } from './FriendShipRepo/friendShipRepo.module';
import { AcceptFriendReqTransactionModule } from './AcceptFriendReqTransaction/acceptFriendReqTransaction.module';

@Module({
    imports: [UcServicesModule,
        UserLookUpModule,
        FriendRequestRepoModule,
        FriendShipRepoModule,
        AcceptFriendReqTransactionModule
    ],
    exports: [
        UcServicesModule,
        UserLookUpModule,
        FriendRequestRepoModule,
        FriendShipRepoModule,
        AcceptFriendReqTransactionModule
    ]
})
export class InfrastructureModule {}