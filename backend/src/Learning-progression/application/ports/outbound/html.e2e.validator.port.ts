import { TaskTest } from '../../../domain/types/task.test';
import { HtmlValidatorRes } from '../dtos/html.validator.res';

export interface HtmlE2eValidatorPort {
    validate(test: TaskTest, code: string): Promise<HtmlValidatorRes>;
}
