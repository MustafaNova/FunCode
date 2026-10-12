import { ClassicMatchState } from '../../../../domain/types/matchStates/classic.match.state';

export interface ClassicMatchStatePort {
    create(roomId: string, state: ClassicMatchState): void;
    delete(roomId: string): void;
    get(roomId: string): ClassicMatchState | null;
}
