import { Module } from '@nestjs/common';
import { HTML_E2E_VALIDATOR, HTML_STATIC_VALIDATOR } from './tokens';
import { HtmlStaticValidatorAdapter } from './html.static.validator.adapter';
import { HtmlE2eValidatorAdapter } from './html.e2e.validator.adapter';

@Module({
    providers: [
        {
            provide: HTML_STATIC_VALIDATOR,
            useClass: HtmlStaticValidatorAdapter,
        },
        {
            provide: HTML_E2E_VALIDATOR,
            useClass: HtmlE2eValidatorAdapter,
        },
    ],
    exports: [HTML_STATIC_VALIDATOR, HTML_E2E_VALIDATOR],
})
export class HtmlValidatorModule {}
