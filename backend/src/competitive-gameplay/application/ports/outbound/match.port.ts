import { Battle1v1 } from '../../../domain/entities/battle1v1';

export interface MatchPort {
    matchFound1v1(battle: Battle1v1): void;
}
