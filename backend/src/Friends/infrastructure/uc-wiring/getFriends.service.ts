import { GetFriendsUC } from '../../application/use-cases/getFriends/getFriends.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type FriendShipRepoPort } from '../../application/ports/outbound/FriendShipRepo.port';
import { FRIENDSHIP_REPO_PORT } from '../tokens';

@Injectable()
export class GetFriendsService extends GetFriendsUC {
    constructor(
        @Inject(FRIENDSHIP_REPO_PORT)
        friendshipRepo: FriendShipRepoPort
    ) {
        super(friendshipRepo);
    }
}