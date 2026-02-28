export interface UserCodeExecutionPort {
    run(userCode: string, tests: K): boolean;
}
