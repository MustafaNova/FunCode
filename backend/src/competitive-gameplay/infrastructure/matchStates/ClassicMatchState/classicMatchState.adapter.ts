import { ClassicMatchStatePort } from '../../../application/ports/outbound/matchStates/classic.match.state.port';
import { Injectable } from '@nestjs/common';
import { ClassicMatchState } from '../../../domain/types/matchStates/classic.match.state';

@Injectable()
export class ClassicMatchStateAdapter implements ClassicMatchStatePort {
    private readonly states = new Map<string, ClassicMatchState>();

    create(roomId: string, state: ClassicMatchState) {
        this.states.set(roomId, state);
    }

    delete(roomId: string) {
        this.states.delete(roomId);
    }

    get(roomId: string): ClassicMatchState | null {
        return this.states.get(roomId) ?? null;
    }
}