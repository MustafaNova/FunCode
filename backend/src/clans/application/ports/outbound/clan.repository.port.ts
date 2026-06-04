
export interface ClanRepositoryPort {
    existsByName(name: string): Promise<void>;
}