import { GetClanMessagesCmd } from '../../use-cases/getClanMessages/getClanMessages.cmd';

export interface GetClanMessagesPort {
    getClanMessages(cmd: GetClanMessagesCmd): void;
}