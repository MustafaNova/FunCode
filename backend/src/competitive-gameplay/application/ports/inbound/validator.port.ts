export interface ValidatorPort {
    checkSubmit(taskId: string, solution: string): boolean;
}
