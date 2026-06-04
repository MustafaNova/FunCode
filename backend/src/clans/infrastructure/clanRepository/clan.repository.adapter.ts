import { ClanRepositoryPort } from '../../application/ports/outbound/clan.repository.port';


export class ClanRepositoryAdapter implements ClanRepositoryPort {
    async existsByName(name: string): Promise<void> {
    }
}