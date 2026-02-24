import {
    Inject,
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';
import { MatchMakerPort } from '../../ports/inbound/match-maker.port';
import type { BattleRepositoryPort } from '../../ports/outbound/battleRepository.port';
import { BATTLE_REPOSITORY_PORT, ID_GENERATOR_PORT } from '../../tokens';
import type { MatchmakingQueuePort } from '../../ports/outbound/matchmaking-queue.port';
import { MatchType, PlayerCount } from '../../../domain/types';
import { Battle1vs1 } from '../../../domain/entities/battle1vs1';
import type { BattleEventPublisherPort } from '../../ports/outbound/battle.event.publisher.port';
import {
    BATTLE_EVENT_PUBLISHER_PORT,
    MATCHMAKING_QUEUE_PORT,
} from '../../../infrastructure/redis/tokens';
import type { IdGeneratorPort } from '../../ports/outbound/id.generator.port';

@Injectable()
export class MatchMakerService
    implements MatchMakerPort, OnModuleInit, OnModuleDestroy
{
    private stopped = false;

    constructor(
        @Inject(BATTLE_REPOSITORY_PORT)
        private readonly battleRepo: BattleRepositoryPort,
        @Inject(MATCHMAKING_QUEUE_PORT)
        private readonly matchMaking: MatchmakingQueuePort,
        @Inject(BATTLE_EVENT_PUBLISHER_PORT)
        private readonly battleEventPublisher: BattleEventPublisherPort,
        @Inject(ID_GENERATOR_PORT)
        private readonly idGenerator: IdGeneratorPort,
    ) {}

    onModuleInit(): any {
        void this.loop();
    }

    onModuleDestroy(): any {
        this.stopped = true;
    }

    async match1v1Unranked() {
        const type = MatchType.UNRANKED;
        const playerNum = PlayerCount.ONE;
        const playerCount = await this.matchMaking.getEntryCount(
            type,
            playerNum,
        );
        console.log('entryCount:', playerCount);
        if (playerCount < 2) return;
        const twoPlayers = await this.matchMaking.popTwoPlayers(
            type,
            playerNum,
        );
        const p1 = twoPlayers[0];
        const p2 = twoPlayers[1];
        console.log(`popped ${p1.username} and ${p2.username}`);

        const roomId = this.idGenerator.generate();
        const battle = Battle1vs1.create(
            { userId: p1.userId, username: p1.username },
            { userId: p2.userId, username: p2.username },
            roomId,
        );

        await this.battleRepo.save1vs1(battle);
        await this.battleEventPublisher.created1v1(battle);
    }

    private async loop() {
        while (!this.stopped) {
            try {
                await this.match1v1Unranked();
            } catch (err) {
                console.log(err);
            }
            await this.sleep(1000);
        }
    }

    private sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
