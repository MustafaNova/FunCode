

export interface SurrenderMatchPort {
    surrender(userId: string, roomId: string): Promise<void>;
}