import { ValidateTaskUC } from '../../../application/use-cases/validateTask/validate.task.uc';
import { Inject, Injectable } from '@nestjs/common';
import { type HtmlStaticValidatorPort } from '../../../application/ports/outbound/html.static.validator.port';
import { type HtmlE2eValidatorPort } from '../../../application/ports/outbound/html.e2e.validator.port';
import {
    HTML_E2E_VALIDATOR,
    HTML_STATIC_VALIDATOR,
} from '../../htmlValidators/tokens';

@Injectable()
export class ValidateTaskService extends ValidateTaskUC {
    constructor(
        @Inject(HTML_STATIC_VALIDATOR)
        htmlStaticValidator: HtmlStaticValidatorPort,
        @Inject(HTML_E2E_VALIDATOR)
        htmlE2eValidator: HtmlE2eValidatorPort,
    ) {
        super(htmlStaticValidator, htmlE2eValidator);
    }
}
