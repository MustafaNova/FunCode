import { Module } from '@nestjs/common';
import { UcServicesModule } from './uc-wiring/uc.services.module';
import { UserLookUpModule } from './UserLookUp/userLookUp.module';
import { FriendRequestRepoModule } from './FriendRequestRepo/friendRequestRepo.module';
import { FriendShipRepoModule } from './FriendShipRepo/friendShipRepo.module';

@Module({
    imports: [UcServicesModule, UserLookUpModule, FriendRequestRepoModule, FriendShipRepoModule],
    exports: [UcServicesModule, UserLookUpModule, FriendRequestRepoModule, FriendShipRepoModule]
})
export class InfrastructureModule {}