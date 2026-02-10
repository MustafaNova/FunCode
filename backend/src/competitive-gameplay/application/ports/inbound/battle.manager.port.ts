import { Battle1vs1 } from '../../../domain/entities/battle1vs1';

export interface BattleManagerPort {
    on1v1Created(battle: Battle1vs1): Promise<void>;
    handleReadyPlayers(userId: string, roomId: string, roomSize: number): void;
}
