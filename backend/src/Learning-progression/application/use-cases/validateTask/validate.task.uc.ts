import { ValidateTaskPort } from '../../ports/inbound/validate.task.port';
import { ValidateTaskCmd } from './validate.task.cmd';
import { HtmlStaticValidatorPort } from '../../ports/outbound/html.static.validator.port';
import { TASK_TESTS } from '../../../infrastructure/database/levels-content/task.tests';
import { HtmlE2eValidatorPort } from '../../ports/outbound/html.e2e.validator.port';

export class ValidateTaskUC implements ValidateTaskPort {
    constructor(
        private readonly htmlStaticValidator: HtmlStaticValidatorPort,
        private readonly htmlE2eValidator: HtmlE2eValidatorPort,
    ) {}

    validate(cmd: ValidateTaskCmd): boolean {
        const taskTest = TASK_TESTS[cmd.taskId];
        switch (taskTest.type) {
            case 'htmlStatic':
                return this.htmlStaticValidator.validate(taskTest, cmd.code);

            case 'htmlE2E':
                return this.htmlE2eValidator.validate(taskTest, cmd.code);

            case 'js':
                // TODO: implement JS validator
                break;

            case 'python':
                // TODO: implement python validator
                break;
        }
        throw new Error('Internal Error');
    }
}
