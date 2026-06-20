import type { GetMyClanRes } from '@funcode/shared';

export type ClanOutletContext = {
    isInClan: boolean,
    refreshClanState: () => Promise<void>,
    myClan: GetMyClanRes | null,
}