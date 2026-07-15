import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendshipEntity } from './friendShip.entity';
import { FRIENDSHIP_REPO_PORT } from '../tokens';
import { FriendShipRepoAdapter } from './friendShipRepo.adapter';


@Module({
    imports: [TypeOrmModule.forFeature([FriendshipEntity])],
    providers: [
        {
            provide: FRIENDSHIP_REPO_PORT,
            useClass: FriendShipRepoAdapter,
        }
    ],
    exports: [FRIENDSHIP_REPO_PORT]
})
export class FriendShipRepoModule {}