

export interface BugHunterValidatorPort {
    validate(taskId: string, code: string): Promise<boolean>;
}