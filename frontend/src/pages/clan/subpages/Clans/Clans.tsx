import s from './clans.module.scss';
import { useState } from 'react';
import { searchClans } from '../../../../services/clans.ts';
import type { SearchClansResDto } from '@funcode/shared';

export function Clans() {
    const placeHolder = 'Search for a clan...';
    const [search, setSearch] = useState<string>('');
    const [clans, setClans] = useState<SearchClansResDto>([]);
    const [hasSearched, setHasSearched] = useState<boolean>();
    const noClansMsg = 'No Clans found..';
    const limit = 10;

    async function handleSearch() {
        const res = await searchClans(search, 1, limit);
        setClans(res);
        setHasSearched(true);
        setSearch('');
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
            <div className={s.clans}>
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
