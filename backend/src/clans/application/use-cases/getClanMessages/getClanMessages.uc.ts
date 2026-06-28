import { GetClanMessagesPort } from '../../ports/inbound/getClanMessages.port';
import { GetClanMessagesCmd } from './getClanMessages.cmd';
import { ClanRepositoryPort } from '../../ports/outbound/clan.repository.port';


export class GetClanMessagesUC implements GetClanMessagesPort {
    constructor(
        private readonly clanRepo: ClanRepositoryPort
    ) {}

    getClanMessages(cmd: GetClanMessagesCmd) {
        console.log(`UC getClanMessages: ${cmd.userId},${cmd.before},${cmd.limit}`)
    }
}