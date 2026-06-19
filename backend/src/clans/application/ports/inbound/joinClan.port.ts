import { JoinClanCmd } from '../../use-cases/joinClan/joinClan.cmd';

export interface JoinClanPort {
    join(cmd: JoinClanCmd): Promise<void>;
}