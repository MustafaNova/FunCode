import { Battle1v1 } from '../../../domain/entities/battle1v1';

export interface BattleRepositoryPort {
    save1v1(battle: Battle1v1): Promise<void>;
    getByRoomId(roomId: string): Promise<Battle1v1 | null>;
    setWinner(roomId: string, winnerId: string): Promise<void>;
}
