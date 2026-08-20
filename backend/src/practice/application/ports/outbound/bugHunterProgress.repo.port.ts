

export interface BugHunterProgressRepoPort {
    getOrCreateHighestUnlockedLevel(userId: string): Promise<number>;
    incrementUnlockedLevel(userId: string): Promise<void>;
    markAllLevelsAsCompleted(userId: string): Promise<void>;
    getCompletedAllLevels(userId: string): Promise<boolean>
}