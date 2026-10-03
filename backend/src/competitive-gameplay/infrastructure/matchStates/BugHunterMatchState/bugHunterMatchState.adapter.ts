import { BugHunterMatchStatePort } from '../../../application/ports/outbound/matchStates/bugHunter.match.state.port';
import { Injectable } from '@nestjs/common';
import { BugHunterMatchState } from '../../../domain/types/matchStates/bugHunter.match.state';

@Injectable()
export class BugHunterMatchStateAdapter implements BugHunterMatchStatePort {

    private readonly states = new Map<string, BugHunterMatchState>();

    create(roomId: string, state: BugHunterMatchState) {
        this.states.set(roomId, state);
    }

    get(roomId: string): BugHunterMatchState | null {
        return this.states.get(roomId) ?? null;
    }

    delete(roomId: string) {
        this.states.delete(roomId);
    }

}
