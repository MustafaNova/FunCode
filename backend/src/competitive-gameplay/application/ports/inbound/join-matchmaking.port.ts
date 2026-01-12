export interface JoinMatchMakingPort {
    join(userId: string): Promise<void>;
}
