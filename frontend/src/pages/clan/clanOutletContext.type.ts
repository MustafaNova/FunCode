export type ClanOutletContext = {
    isInClan: boolean,
    loadIsInClan: () => Promise<void>,
}