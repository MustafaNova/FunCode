import { HtmlStaticValidatorPort } from '../../application/ports/outbound/html.static.validator.port';
import { TaskTest } from '../../domain/types/task.test';
import { Injectable } from '@nestjs/common';
import { HtmlValidatorRes } from '../../application/ports/dtos/html.validator.res';

@Injectable()
export class HtmlStaticValidatorAdapter implements HtmlStaticValidatorPort {
    validate(test: TaskTest, code: string): HtmlValidatorRes {
        throw new Error('HtmlStaticValidatorAdapter not implemented');
    }
}
