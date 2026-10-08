import { MatchMessagePayload } from '@funcode/shared';

export interface SendMatchMessagePort {
    execute(
        userId: string,
        roomId: string,
        payload: MatchMessagePayload
    ): void;
}