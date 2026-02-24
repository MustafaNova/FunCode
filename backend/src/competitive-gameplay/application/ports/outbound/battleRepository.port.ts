import { Battle1vs1 } from '../../../domain/entities/battle1vs1';

export interface BattleRepositoryPort {
    save1vs1(battle: Battle1vs1): Promise<void>;
    setWinner(roomId: string, winnerId: string): Promise<void>;
}
