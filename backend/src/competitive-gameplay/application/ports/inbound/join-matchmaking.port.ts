export interface JoinMatchMakingUC {
    join(userId: string): Promise<void>;
}
