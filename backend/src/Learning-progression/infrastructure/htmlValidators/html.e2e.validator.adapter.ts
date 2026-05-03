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

        for (const check of test.checks) {
            if (check.type == 'element_exists') {
                const el = await page.$(check.selector);
                if (!el) return { res: false };
                if (check.text) {
                    const text = await el.textContent();
                    if (text?.trim() !== check.text) return { res: false };
                }
            }

            if (check.type == 'interaction') {
                const el = await page.$(check.target);
                if (!el) return { res: false };
                await page.click(check.target);
                const text = await page.$eval(check.result.selector, (el) =>
                    el.textContent?.trim(),
                );
                if (text !== check.result.text) return { res: false };
            }
        }

        await browser.close();
        return { res: true };
    }
}
