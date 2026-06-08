import { ClanRole } from '../../../../domain/enums/clanRole.enum';

export interface AddClanMemberData {
    userId: string,
    clanId: string,
    role: ClanRole,
}
