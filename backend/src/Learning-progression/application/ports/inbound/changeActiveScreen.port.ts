import { ChangeActiveScreenCmd } from '../../use-cases/changeActiveScreen/changeActiveScreen.cmd';

export interface ChangeActiveScreenPort {
    execute(cmd: ChangeActiveScreenCmd): Promise<void>;
}
