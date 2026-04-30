import { TaskTest } from '../../../domain/types/task.test';

export interface HtmlStaticValidatorPort {
    validate(test: TaskTest, code: string): boolean;
}
