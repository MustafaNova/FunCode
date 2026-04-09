import { MatchPort } from '../../application/ports/outbound/match.port';
import { Injectable } from '@nestjs/common';
import { Battle1vs1 } from '../../domain/entities/battle1vs1';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SOCKET_EVENTS } from '@funcode/shared';

@Injectable()
export class MatchAdapter implements MatchPort {
    constructor(private readonly eventEmitter: EventEmitter2) {}

    matchFound1v1(battle: Battle1vs1): void {
        this.eventEmitter.emit(SOCKET_EVENTS.MATCH_FOUND, battle);
    }
}
