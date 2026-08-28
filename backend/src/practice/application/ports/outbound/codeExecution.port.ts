import { PracticeProgrammingLanguage } from '../../../domain/types/practiceProgrammingLanguages';

export interface CodeExecutionPort {
    execute(language: PracticeProgrammingLanguage, code: string): Promise<boolean>;
}