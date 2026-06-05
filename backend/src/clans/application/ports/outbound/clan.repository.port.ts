
export interface ClanRepositoryPort {
    existsByName(name: string): Promise<boolean>;
    isUserInClan(userId: string): Promise<boolean>
}