export interface MatchmakingQueuePort {
    enqueue(userId: string): Promise<void>
    dequeuePair(): Promise<string>
}