import { Battle1vs1 } from '../../../domain/entities/battle1vs1';

export interface MatchPort {
    matchFound1v1(battle: Battle1vs1): void;
}
