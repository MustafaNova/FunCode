import { HtmlStaticValidatorPort } from '../../application/ports/outbound/html.static.validator.port';
import { TaskTest } from '../../domain/types/task.test';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HtmlStaticValidatorAdapter implements HtmlStaticValidatorPort {
    validate(test: TaskTest, code: string): boolean {
        throw new Error('HtmlStaticValidatorAdapter not implemented');
    }
}
