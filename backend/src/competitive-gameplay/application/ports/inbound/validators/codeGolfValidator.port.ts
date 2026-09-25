

export interface CodeGolfValidatorPort {
    validate(taskId: string, code: string): Promise<boolean>;
}