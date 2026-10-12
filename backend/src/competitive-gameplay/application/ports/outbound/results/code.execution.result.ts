export interface CodeExecutionResult {
    tests: {
        index: number;
        passed: boolean;
    }[];
    executionFailed: boolean,
}