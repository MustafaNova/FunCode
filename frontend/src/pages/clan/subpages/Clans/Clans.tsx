import s from './clans.module.scss';
import { useState, type UIEvent } from 'react';
import { joinClan, searchClans } from '../../../../services/clans.ts';
import type { ClanDto, SearchClansResDto } from '@funcode/shared';
import { useOutletContext } from 'react-router-dom';
import type { ClanOutletContext } from '../../clanOutletContext.type.ts';

export function Clans() {
    const { refreshClanState } = useOutletContext<ClanOutletContext>();
    const [search, setSearch] = useState<string>('');
    const [clans, setClans] = useState<SearchClansResDto>([]);
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [lastSearch, setLastSearch] = useState<string>('');
    const [chosenClan, setChosenClan] = useState<ClanDto | null>(null);
    const [showError, setShowError] = useState<boolean>(false);
    const errorMsg = 'Something went wrong';
    const noClansMsg = 'No Clans found..';
    const placeHolder = 'Search for a clan...';
    const maxMemberCount = 20;
    const limit = 10;

    async function handleSearch() {
        if (loading) return;

        setLoading(true);

        const res = await searchClans(search, 1, limit);

        setClans(res);
        setHasSearched(true);
        setLastSearch(search);
        setPage(1);
        setHasMore(res.length === limit);
        setSearch('');

        setLoading(false);
    }

    async function loadMore() {
        if (loading || !hasMore || !hasSearched) return;

        setLoading(true);

        const nextPage = page + 1;
        const res = await searchClans(lastSearch, nextPage, limit);
        setClans(prevState => [...prevState, ...res]);
        setPage(nextPage);
        setHasMore(res.length === limit);

        setLoading(false);
    }

    function handleScroll(e: UIEvent<HTMLDivElement>) {
        const element = e.currentTarget;

        const isBottom =
            element.scrollTop + element.clientHeight >= element.scrollHeight - 10;

        if (isBottom) {
            void loadMore();
        }
    }

    async function handleJoinClan() {
        if (!chosenClan) return;

        try {
            setShowError(false);
            await joinClan(chosenClan.id);
            await refreshClanState()
        } catch (err) {
            if (err instanceof Error) {
                setShowError(true);
            }
        }
    }

    return (
        <div className={s.clansTab}>
            <div className={s.infoBox}>
                <span>Create or join a clan for:</span>
                <span>Clan chat, clan battles and friendly matches with clanmates!</span>
                <span>You can search for a clan</span>
            </div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={placeHolder}/>
            <button onClick={handleSearch}>Search</button>
            <div className={s.clans} onScroll={handleScroll}>
                {hasSearched && clans.length === 0 && ( <p>{noClansMsg}</p> )}
                {clans.map((clan) => (
                    <button onClick={() => setChosenClan(clan)}>
                        <span>{clan.name}</span>
                        <span>{clan.memberCount}/{maxMemberCount}</span>
                    </button>
                ))}
            </div>
            {chosenClan && (
                <div className={s.popUp}>
                    <span>name: {chosenClan.name}</span>
                    <span>description: {chosenClan.description}</span>
                    <span>memberCount: {chosenClan.memberCount}</span>
                    <button onClick={handleJoinClan}>Join</button>
                    <button className={s.leavePopUp} onClick={() => setChosenClan(null)}>X</button>
                </div>
            )}
            {showError && (
                <div className={s.errorMsg}>{errorMsg}</div>
            )}
        </div>
    )
}
