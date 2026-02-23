import { Injectable } from '@nestjs/common';
import { BattleRepositoryPort } from '../../../application/ports/outbound/battleRepository.port';
import { Battle1vs1 } from '../../../domain/entities/battle1vs1';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Battle1vs1Entity } from './typeorm/battle1vs1.entity';

@Injectable()
export class BattleRepositoryAdapter implements BattleRepositoryPort {
    constructor(
        @InjectRepository(Battle1vs1Entity)
        private readonly battleRepo: Repository<Battle1vs1Entity>,
    ) {}

    async save1vs1(battle: Battle1vs1): Promise<void> {
        const p1 = battle.player1;
        const p2 = battle.player2;
        const battleEntity = this.battleRepo.create({
            roomId: battle.roomId,
            playerId1: p1.userId,
            playerUsername1: p1.username,
            playerId2: p2.userId,
            playerUsername2: p2.username,
        });
        await this.battleRepo.save(battleEntity);
    }

    async setWinner(userId: string): Promise<void> {

    }
}
