import { TaskTest } from '../../../domain/types/task.test';

export interface HtmlE2eValidatorPort {
    validate(test: TaskTest, code: string): boolean;
}
