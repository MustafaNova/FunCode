import { SubmitCmd } from '../../use-cases/battle-manager/dtos/submit.cmd';


export interface SubmitArenaSolutionPort {
    submit(submit: SubmitCmd): Promise<void>;
}