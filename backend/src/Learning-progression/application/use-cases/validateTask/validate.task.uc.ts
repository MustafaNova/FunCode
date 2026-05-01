import { ValidateTaskPort } from '../../ports/inbound/validate.task.port';
import { ValidateTaskCmd } from './validate.task.cmd';
import { HtmlStaticValidatorPort } from '../../ports/outbound/html.static.validator.port';
import { TASK_TESTS } from '../../../infrastructure/database/levels-content/task.tests';
import { HtmlE2eValidatorPort } from '../../ports/outbound/html.e2e.validator.port';
import { ValidateTaskRes } from './validate.task.res';

export class ValidateTaskUC implements ValidateTaskPort {
    constructor(
        private readonly htmlStaticValidator: HtmlStaticValidatorPort,
        private readonly htmlE2eValidator: HtmlE2eValidatorPort,
    ) {}

    async validate(cmd: ValidateTaskCmd): Promise<ValidateTaskRes> {
        const taskTest = TASK_TESTS[cmd.taskId];
        switch (taskTest.type) {
            case 'htmlStatic': {
                const validatorRes = this.htmlStaticValidator.validate(
                    taskTest,
                    cmd.code,
                );
                return { res: validatorRes.res };
            }

            case 'htmlE2E': {
                const validatorRes = await this.htmlE2eValidator.validate(
                    taskTest,
                    cmd.code,
                );
                return { res: validatorRes.res };
            }

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
