import { PracticeProgrammingLanguage } from '@funcode/shared';

export interface CodeExecutionPort {
    execute(language: PracticeProgrammingLanguage, code: string): Promise<boolean>;
}