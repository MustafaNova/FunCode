import { ValidateTaskCmd } from '../../use-cases/validateTask/validate.task.cmd';

export interface ValidateTaskPort {
    validate(cmd: ValidateTaskCmd): boolean;
}
