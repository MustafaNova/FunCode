import { ValidateTaskCmd } from '../../use-cases/validateTask/validate.task.cmd';
import { ValidateTaskRes } from '../../use-cases/validateTask/validate.task.res';

export interface ValidateTaskPort {
    validate(cmd: ValidateTaskCmd): Promise<ValidateTaskRes>;
}
