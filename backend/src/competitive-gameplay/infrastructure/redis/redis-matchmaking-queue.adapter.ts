import { MatchmakingQueuePort } from '../../application/ports/outbound/matchmaking-queue.port';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../../application/tokens';
import { Inject } from '@nestjs/common';
import { QueueEntry } from '../../domain/entities/queueEntry';
import { MatchType, PlayerCount } from '../../domain/types';

export class RedisMatchmakingQueueAdapter implements MatchmakingQueuePort {
    constructor(
        @Inject(REDIS_CLIENT)
        private readonly redis: Redis,
    ) {}

    private key_1vs1_unranked = 'queue:matchmaking:1vs1:unranked';
    private key_1vs1_ranked = 'queue:matchmaking:1vs1:ranked';
    private key_2vs2_unranked = 'queue:matchmaking:2vs2:unranked';
    private key_2vs2_ranked = 'queue:matchmaking:2vs2:ranked';

    async enqueue(
        queueEntry: QueueEntry,
        type: MatchType,
        players: PlayerCount,
    ): Promise<void> {
        const time = Date.now();
        const value = JSON.stringify({
            userId: queueEntry.userId,
            username: queueEntry.username,
        });

        const key = this.getQueueKey(type, players);
        await this.redis.zadd(key, time, value);
    }

    async getEntryCount(
        type: MatchType,
        players: PlayerCount,
    ): Promise<number> {
        const key = this.getQueueKey(type, players);
        return this.redis.zcard(key);
    }

    async popTwoPlayers(
        type: MatchType,
        players: PlayerCount,
    ): Promise<QueueEntry[]> {
        const key = this.getQueueKey(type, players);
        const unparsedRes = await this.redis.zpopmin(key, 2);
        // return this.parseQueueEntry(unparsedRes);
    }

    private parseQueueEntry(entry: string[]): QueueEntry[] {}

    private getQueueKey(type: MatchType, players: PlayerCount) {
        switch (players) {
            case PlayerCount.ONE:
                if (type == MatchType.UNRANKED) return this.key_1vs1_unranked;
                else return this.key_1vs1_ranked;
            case PlayerCount.TWO:
                if (type == MatchType.UNRANKED) return this.key_2vs2_unranked;
                else return this.key_2vs2_ranked;
        }
    }
}
