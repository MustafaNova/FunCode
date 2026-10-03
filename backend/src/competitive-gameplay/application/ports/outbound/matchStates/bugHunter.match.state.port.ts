import { BugHunterMatchState } from '../../../../domain/types/matchStates/bugHunter.match.state';

export interface BugHunterMatchStatePort {
    create(roomId: string, state: BugHunterMatchState): void;
    get(roomId: string): BugHunterMatchState | null;
    delete(roomId: string): void;
}
