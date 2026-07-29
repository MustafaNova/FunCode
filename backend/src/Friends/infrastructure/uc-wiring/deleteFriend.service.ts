import { DeleteFriendUC } from '../../application/use-cases/deleteFriend/deleteFriend.uc';
import { Inject, Injectable } from '@nestjs/common';
import { FRIENDSHIP_REPO_PORT } from '../tokens';
import type { FriendShipRepoPort } from '../../application/ports/outbound/FriendShipRepo.port';

@Injectable()
export class DeleteFriendService extends DeleteFriendUC {
    constructor(
        @Inject(FRIENDSHIP_REPO_PORT)
        friendshipRepo: FriendShipRepoPort
    ) {
        super(friendshipRepo);
    }
}