import { ClanEntity } from '../entities/clan.entity';
import { Clan } from '../../domain/entities/clan';

export class ClanMapper {
    static toDomain(entity: ClanEntity) {
        return new Clan(
            entity.id,
            entity.name,
            entity.description,
        )
    }
}