import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequestEntity } from './friendRequest.entity';
import { FRIEND_REQUEST_REPO_PORT } from '../tokens';
import { FriendRequestRepoAdapter } from './friendRequestRepo.adapter';


@Module({
    imports: [TypeOrmModule.forFeature([FriendRequestEntity])],
    providers: [
        {
            provide: FRIEND_REQUEST_REPO_PORT,
            useClass: FriendRequestRepoAdapter,
        }
    ],
    exports: [FRIEND_REQUEST_REPO_PORT]
})
export class FriendRequestRepoModule {}