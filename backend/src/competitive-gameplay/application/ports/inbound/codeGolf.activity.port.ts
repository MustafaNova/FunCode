import { CodeGolfActivityPayload } from '@funcode/shared/dist/competitive-gameplay/payloads/codeGolf.activity.payload';


export interface CodeGolfActivityPort {
    handle(userId: string, roomId: string, payload: CodeGolfActivityPayload): void;
}