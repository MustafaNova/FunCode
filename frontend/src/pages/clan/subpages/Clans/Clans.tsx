import s from './clans.module.scss';
import { useState } from 'react';
import { searchClans } from '../../../../services/clans.ts';
import type { SearchClansResDto } from '@funcode/shared';
import * as React from 'react';

export function Clans() {
    const placeHolder = 'Search for a clan...';
    const [search, setSearch] = useState<string>('');
    const [clans, setClans] = useState<SearchClansResDto>([]);
    const [hasSearched, setHasSearched] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [lastSearch, setLastSearch] = useState<string>('');
    const noClansMsg = 'No Clans found..';
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

    function handleScroll(e: React.UIEvent<HTMLDivElement>) {
        const element = e.currentTarget;

        const isBottom =
            element.scrollTop + element.clientHeight >= element.scrollHeight - 10;

        if (isBottom) {
            void loadMore();
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
                    <div>
                        <span>{clan.name}</span>
                        <span>{clan.memberCount}/20</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
