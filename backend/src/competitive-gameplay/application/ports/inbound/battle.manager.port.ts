import { Battle1vs1 } from '../../../domain/entities/battle1vs1';
import { ReadyPlayerCmd } from '../../use-cases/battle-manager/dtos/ready.player.cmd';
import { SubmitCmd } from '../../use-cases/battle-manager/dtos/submit.cmd';

export interface BattleManagerPort {
    on1v1Created(battle: Battle1vs1): Promise<void>;
    handleReadyPlayer(readyPlayer: ReadyPlayerCmd): void;
    handleSolutionSubmit(submit: SubmitCmd): void;
    registerNewPlayer(userId: string): void;
}
