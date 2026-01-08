import {JoinMatchMakingUC} from "../ports/inbound/join-matchmaking.port";
import type {MatchmakingQueuePort} from "../ports/outbound/matchmaking-queue.port";
import {Inject, Injectable} from "@nestjs/common";

@Injectable()
export class JoinMatchmakingService
    implements JoinMatchMakingUC {

    constructor(
        @Inject("MatchMakingQueuePort")
        private readonly matchmakingQueuePort: MatchmakingQueuePort) {
    }

    join(userId: string): Promise<void> {
        return this.matchmakingQueuePort.enqueue(userId)
    }


}