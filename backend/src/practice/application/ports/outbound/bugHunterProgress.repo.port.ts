

export interface BugHunterProgressRepoPort {
    getOrCreateHighestUnlockedLevel(userId: string): Promise<number>;
}