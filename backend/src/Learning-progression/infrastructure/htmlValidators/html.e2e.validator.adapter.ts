import { HtmlE2eValidatorPort } from '../../application/ports/outbound/html.e2e.validator.port';
import { Injectable } from '@nestjs/common';
import {
    BackgroundColorChange,
    CharCount,
    Check,
    CounterIncrement,
    ElementExistsCheck,
    ElementVisibilityChangesCheck,
    FormGreeting,
    InputSync,
    InputType,
    InteractionCheck,
    RandomNumber,
    TaskTest,
} from '../../domain/types/task.test';
import { HtmlValidatorRes } from '../../application/ports/dtos/html.validator.res';
import { chromium, Page } from 'playwright';

@Injectable()
export class HtmlE2eValidatorAdapter implements HtmlE2eValidatorPort {
    async validate(test: TaskTest, code: string): Promise<HtmlValidatorRes> {
        console.log('started HtmlE2eValidatorAdapter');
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
        let result = false;

        switch (check.type) {
            case 'element_exists':
                result = await this.validateElementExists(page, check);
                break;
            case 'interaction':
                result = await this.validateInteraction(page, check);
                break;
            case 'element_visibility_changes':
                result = await this.validateElementVisibilityChange(
                    page,
                    check,
                );
                break;
            case 'input_sync':
                result = await this.validateInputSync(page, check);
                break;
            case 'formGreeting':
                result = await this.validateFormGreeting(page, check);
                break;
            case 'counterIncrement':
                result = await this.validateCounterInc(page, check);
                break;
            case 'backgroundColorChange':
                result = await this.validateBackgroundColorChange(page, check);
                break;
            case 'inputType':
                result = await this.validateInputType(page, check);
                break;
            case 'randomNumber':
                result = await this.validateRandomNumber(page, check);
                break;
            case 'charCount':
                result = await this.validateCharCount(page, check);
                break;
            default:
                return false;
        }

        console.log(`[${check.type}] =>`, result);
        return result;
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

    private async validateFormGreeting(page: Page, check: FormGreeting) {
        const input = page.locator(check.inputSelector);
        const button = page.locator(check.buttonSelector);
        const target = page.locator(check.targetSelector);

        if (!input || !button || !target) {
            return false;
        }

        await input.fill(check.inputValue);
        await button.click();

        const text = await target.textContent();

        if (!text) {
            return false;
        }
        return text?.trim() == check.expectedValue;
    }

    private async validateCounterInc(page: Page, check: CounterIncrement) {
        const button = page.locator(check.buttonSelector);
        const counter = page.locator(check.counterSelector);

        if (!button || !counter) {
            return false;
        }

        const startValue = Number(await counter.textContent());

        if (isNaN(startValue)) {
            return false;
        }

        await button.click();

        const endValue = Number(await counter.textContent());

        return endValue == startValue + check.incrementBy;
    }

    private async validateBackgroundColorChange(
        page: Page,
        check: BackgroundColorChange,
    ) {
        const expectedColorHex = '#ff0000';
        const expectedColorRgb = 'rgb(255, 0, 0)';
        const input = page.locator(check.inputSelector);

        if (!input) {
            return false;
        }

        await input.fill(expectedColorHex);

        const bgColor = await page.evaluate(() => {
            return window.getComputedStyle(document.body).backgroundColor;
        });

        return bgColor == expectedColorRgb;
    }

    private async validateInputType(page: Page, check: InputType) {
        const input = page.locator(check.selector);
        const type = await input.getAttribute('type');
        return type == check.expectedInputType;
    }

    private async validateRandomNumber(page: Page, check: RandomNumber) {
        const button = page.locator(check.buttonSelector);
        const target = page.locator(check.targetSelector);

        if (!button || !target) {
            return false;
        }

        await button.click();

        const text = await target.textContent();
        if (!text) {
            return false;
        }

        const value = Number(text.trim());
        if (!value) {
            return false;
        }

        return value >= check.min && value <= check.max;
    }

    private async validateCharCount(page: Page, check: CharCount) {
        const value = 'Hello world';
        const input = page.locator(check.inputSelector);
        const target = page.locator(check.targetSelector);
        if (!input || !target) {
            return false;
        }

        await input.fill(value);

        const text = await target.textContent();
        if (!text) {
            return false;
        }

        const count = Number(text.trim());

        if (isNaN(count)) {
            return false;
        }

        return count == value.length;
    }
}
