import { CreateClanReq } from '@funcode/shared';

export interface CreateClanPort {
    createClan(req: CreateClanReq): Promise<void>;
}