export interface ClassicValidatorPort {
    validate(taskId: string, code: string): Promise<boolean>;
}
