import { ClanMemberEntity } from '../entities/clan-member.entity';
import { ClanMember } from '../../domain/entities/clanMember';

export class ClanMemberMapper {
    static toDomain(clanMemberEntity: ClanMemberEntity) {
        return new ClanMember(
            clanMemberEntity.id,
            clanMemberEntity.userId,
            clanMemberEntity.clanId,
            clanMemberEntity.role
        )
    }
}