import { ClanRole } from '../enums/clanRole.enum';

export class ClanMember {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly clanId: string,
        public readonly role: ClanRole,
    ) {
    }
}