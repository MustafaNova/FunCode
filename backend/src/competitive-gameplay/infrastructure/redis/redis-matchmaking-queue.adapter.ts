import { MatchmakingQueuePort } from '../../application/ports/outbound/matchmaking-queue.port';
import Redis from 'ioredis';
import { Inject } from '@nestjs/common';
import { QueueEntry } from '../../domain/entities/queueEntry';
import { REDIS_CLIENT } from './tokens';
import { ArenaGameModeId } from '@funcode/shared';

interface PlayerEntry {
    userId: string;
    username: string;
}
export class RedisMatchmakingQueueAdapter implements MatchmakingQueuePort {
    constructor(
        @Inject(REDIS_CLIENT)
        private readonly redis: Redis,
    ) {}

    async enqueue(
        queueEntry: QueueEntry,
        gameModeId: ArenaGameModeId
    ): Promise<void> {
        const time = Date.now();
        const value = this.toPlayerEntryValue(queueEntry);
        const key = this.getMatchmakingQueueKey(gameModeId);
        await this.redis.zadd(key, time, value);
    }

    async remove(queueEntry: QueueEntry, gameModeId: ArenaGameModeId): Promise<void> {
        const value = this.toPlayerEntryValue(queueEntry);
        const key = this.getMatchmakingQueueKey(gameModeId)
        await this.redis.zrem(key, value);
    }

    async getEntryCount(gameModeId: ArenaGameModeId): Promise<number> {
        const key = this.getMatchmakingQueueKey(gameModeId);
        return this.redis.zcard(key);
    }

    async popTwoPlayers(gameModeId: ArenaGameModeId): Promise<QueueEntry[]> {
        const key = this.getMatchmakingQueueKey(gameModeId);
        const unparsedRes = await this.redis.zpopmin(key, 2);
        return this.parseQueueEntry(unparsedRes);
    }

    async tryPopTwoPlayers(gameModeId: ArenaGameModeId): Promise<[QueueEntry, QueueEntry] | null> {
        const key = this.getMatchmakingQueueKey(gameModeId);

        const script = `
            local players = redis.call('ZRANGE', KEYS[1], 0, 1)

            if #players < 2 then
                return {}
            end

            redis.call('ZREM', KEYS[1], players[1], players[2])

            return players
        `;

        const result = await this.redis.eval(
            script,
            1,
            key,
        ) as string[];

        if (result.length < 2) {
            return null;
        }

        return this.parseQueueEntries(result);
    }

    private parseQueueEntries(
        entries: string[],
    ): [QueueEntry, QueueEntry] {
        const playerOne = JSON.parse(entries[0]) as PlayerEntry;
        const playerTwo = JSON.parse(entries[1]) as PlayerEntry;

        return [
            QueueEntry.create(
                playerOne.userId,
                playerOne.username,
            ),
            QueueEntry.create(
                playerTwo.userId,
                playerTwo.username,
            ),
        ];
    }

    private parseQueueEntry(entry: string[]): QueueEntry[] {
        const playerOne = JSON.parse(entry[0]) as PlayerEntry;
        const playerTwo = JSON.parse(entry[2]) as PlayerEntry;
        const entryOne = QueueEntry.create(
            playerOne.userId,
            playerOne.username,
        );
        const entryTwo = QueueEntry.create(
            playerTwo.userId,
            playerTwo.username,
        );
        return [entryOne, entryTwo];
    }

    private getMatchmakingQueueKey(gameModeId: ArenaGameModeId) {
        return `queue:matchmaking:${gameModeId}`;
    }

    private toPlayerEntryValue(queueEntry: QueueEntry) {
        return JSON.stringify({
                userId: queueEntry.userId,
                username: queueEntry.username,
            })
    }
}
