export interface UserRepoPort {
    markOnboardingCompleted(userId: string): void;
}