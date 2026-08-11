export interface CodeExecutionPort {
    execute(language: string, code: string): Promise<boolean>;
}