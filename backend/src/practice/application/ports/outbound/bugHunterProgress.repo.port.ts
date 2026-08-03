

export interface BugHunterProgressRepoPort {
    getHighestUnlockedLevel(userId: string): Promise<number | null>;
}