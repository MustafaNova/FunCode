import { ClanRole } from '../enums/clanRole.enum';

export type MyClan = {
    clanId: string,
    name: string,
    description: string | null,
    role: ClanRole,
}

