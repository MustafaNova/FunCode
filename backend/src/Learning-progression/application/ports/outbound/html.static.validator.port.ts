import { TaskTest } from '../../../domain/types/task.test';
import { HtmlValidatorRes } from '../dtos/html.validator.res';

export interface HtmlStaticValidatorPort {
    validate(test: TaskTest, code: string): HtmlValidatorRes;
}
