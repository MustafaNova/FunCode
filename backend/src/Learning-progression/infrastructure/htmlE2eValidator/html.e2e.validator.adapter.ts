import { HtmlE2eValidatorPort } from '../../application/ports/outbound/html.e2e.validator.port';
import { Injectable } from '@nestjs/common';
import { TaskTest } from '../../domain/types/task.test';

@Injectable()
export class HtmlE2eValidatorAdapter implements HtmlE2eValidatorPort {
    validate(test: TaskTest, code: string): boolean {

    }
}
