import { HtmlE2eValidatorPort } from '../../application/ports/outbound/html.e2e.validator.port';
import { Injectable } from '@nestjs/common';
import {
    Check,
    ElementExistsCheck,
    ElementVisibilityChangesCheck,
    InputSync,
    InteractionCheck,
    TaskTest,
} from '../../domain/types/task.test';
import { HtmlValidatorRes } from '../../application/ports/dtos/html.validator.res';
import { chromium, Page } from 'playwright';

@Injectable()
export class HtmlE2eValidatorAdapter implements HtmlE2eValidatorPort {
    async validate(test: TaskTest, code: string): Promise<HtmlValidatorRes> {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.setContent(code);

        for (const check of test.checks) {
            const valid = await this.runCheck(page, check);
            if (!valid) {
                return { res: false };
            }
        }

        await browser.close();
        return { res: true };
    }

    private async runCheck(page: Page, check: Check) {
        switch (check.type) {
            case 'element_exists':
                return await this.validateElementExists(page, check);
            case 'interaction':
                return await this.validateInteraction(page, check);
            case 'element_visibility_changes':
                return await this.validateElementVisibilityChange(page, check);
            case 'input_sync':
                return await this.validateInputSync(page, check);
            default:
                return false;
        }
    }

    private async validateElementExists(page: Page, check: ElementExistsCheck) {
        const el = await page.$(check.selector);
        if (!el) return false;
        if (check.text) {
            const text = await el.textContent();
            if (text?.trim() !== check.text) return false;
        }
        return true;
    }

    private async validateInteraction(page: Page, check: InteractionCheck) {
        const el = await page.$(check.target);
        if (!el) return false;
        await page.click(check.target);
        const text = await page.$eval(check.result.selector, (el) =>
            el.textContent?.trim(),
        );
        return text === check.result.text;
    }

    private async validateElementVisibilityChange(
        page: Page,
        check: ElementVisibilityChangesCheck,
    ) {
        const target = await page.$(check.selector);
        if (!target) {
            return false;
        }
        const wasVisibleBefore = await target.isVisible();

        if (check.trigger.event == 'click') {
            await page.click(check.trigger.selector);
        }

        const isVisibleAfter = await target.isVisible();

        return wasVisibleBefore !== isVisibleAfter;
    }

    private async validateInputSync(page: Page, check: InputSync) {
        const value = 'TEST_VALUE';
        const input = await page.$(check.inputId);
        const target = await page.$(check.targetId);
        if (!input || !target) {
            return false;
        }

        await page.fill(check.inputId, value);

        const text = await page.$eval(check.targetId, (el) => {
            return el.textContent?.trim();
        });

        return text == value;
    }
}
