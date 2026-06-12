import type { GetMyClanRes } from '@funcode/shared';

export type ClanOutletContext = {
    isInClan: boolean,
    loadIsInClan: () => Promise<void>,
    myClan: GetMyClanRes | null,
}