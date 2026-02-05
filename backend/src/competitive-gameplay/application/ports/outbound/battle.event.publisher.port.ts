import { Battle1vs1 } from '../../../domain/entities/battle1vs1';

export interface BattleEventPublisherPort {
    created1v1(battle: Battle1vs1): Promise<void>;
}
