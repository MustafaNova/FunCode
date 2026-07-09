import { Module } from '@nestjs/common';
import { UcServicesModule } from './uc-wiring/uc.services.module';
import { UserLookUpModule } from './UserLookUp/userLookUp.module';
import { FriendRequestRepoModule } from './FriendRequestRepo/friendRequestRepo.module';

@Module({
    imports: [UcServicesModule, UserLookUpModule, FriendRequestRepoModule],
    exports: [UcServicesModule, UserLookUpModule, FriendRequestRepoModule]
})
export class InfrastructureModule {}