import { HtmlE2eValidatorPort } from '../../application/ports/outbound/html.e2e.validator.port';
import { Injectable } from '@nestjs/common';
import { TaskTest } from '../../domain/types/task.test';
import { HtmlValidatorRes } from '../../application/ports/dtos/html.validator.res';
import { chromium } from 'playwright';

@Injectable()
export class HtmlE2eValidatorAdapter implements HtmlE2eValidatorPort {
    async validate(test: TaskTest, code: string): Promise<HtmlValidatorRes> {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.setContent(code);
        const el = await page.$('div');
        console.log(el);

        return { res: false };
    }
}
