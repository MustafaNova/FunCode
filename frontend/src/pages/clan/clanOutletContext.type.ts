import type { GetMyClanRes } from '@funcode/shared';

export type ClanOutletContext = {
    isInClan: boolean,
    loadMyClan: () => Promise<void>,
    myClan: GetMyClanRes | null,
}