import { JoinCmd } from '../../use-cases/matchmaking-join/dtos/join.cmd';
import { JoinRes } from '../../use-cases/matchmaking-join/dtos/join.res';

export interface JoinMatchMakingPort {
    join(joinCmd: JoinCmd): Promise<JoinRes>;
}
