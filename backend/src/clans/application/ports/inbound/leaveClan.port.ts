export interface LeaveClanPort {
    leaveClan(userId: string): Promise<void>;
}