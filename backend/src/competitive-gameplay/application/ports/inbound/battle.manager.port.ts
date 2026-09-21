import { Battle1v1 } from '../../../domain/entities/battle1v1';
import { ReadyPlayerCmd } from '../../use-cases/battle-manager/dtos/ready.player.cmd';
import { SubmitCmd } from '../../use-cases/battle-manager/dtos/submit.cmd';

export interface BattleManagerPort {
    on1v1Created(battle: Battle1v1): Promise<void>;
    handleReadyPlayer(readyPlayer: ReadyPlayerCmd): Promise<void>;
    handleSolutionSubmit(submit: SubmitCmd): Promise<void>;
}
