import { ClanRole } from '../../../domain/enums/clanRole.enum';

export type GetMyClanRes = {
    clanId: string;
    name: string;
    description: string | null;
    role: ClanRole;
};