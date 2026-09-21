import { Injectable } from '@nestjs/common';
import { BattleRepositoryPort } from '../../../application/ports/outbound/battleRepository.port';
import { Battle1v1 } from '../../../domain/entities/battle1v1';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Battle1vs1Entity } from './typeorm/battle1vs1.entity';

@Injectable()
export class BattleRepositoryAdapter implements BattleRepositoryPort {
    constructor(
        @InjectRepository(Battle1vs1Entity)
        private readonly battleRepo: Repository<Battle1vs1Entity>,
    ) {}

    async save1v1(battle: Battle1v1): Promise<void> {
        const p1 = battle.player1;
        const p2 = battle.player2;
        const battleEntity = this.battleRepo.create({
            roomId: battle.roomId,
            playerId1: p1.userId,
            playerUsername1: p1.username,
            playerId2: p2.userId,
            playerUsername2: p2.username,
            gameModeId: battle.gameModeId
        });
        await this.battleRepo.save(battleEntity);
    }

    async getByRoomId(roomId: string): Promise<Battle1v1 | null> {
        const battle = await this.battleRepo.findOne({
            where: { roomId }
        })

        if (!battle) return null;

        return {
            player1: { userId: battle.playerId1, username: battle.playerUsername1 },
            player2: { userId: battle.playerId2, username: battle.playerUsername2 },
            roomId,
            gameModeId: battle.gameModeId
        }
    }

    async setWinner(roomId: string, winnerId: string): Promise<void> {
        await this.battleRepo.update({ roomId }, { winnerId });
    }
}
