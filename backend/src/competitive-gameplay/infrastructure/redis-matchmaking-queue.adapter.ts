import {MatchmakingQueuePort} from "../application/ports/outbound/matchmaking-queue.port";
import {User} from "../domain/entities/user";

export class RedisMatchmakingQueueAdapter
    implements MatchmakingQueuePort {


    enqueue(user: User): Promise<void> {

    }


}