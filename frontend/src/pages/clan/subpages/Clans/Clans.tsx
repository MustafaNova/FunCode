import s from './clans.module.scss';
import { useState } from 'react';
import { searchClans } from '../../../../services/clans.ts';

export function Clans() {
    const placeHolder = 'Search for a clan...';
    const [search, setSearch] = useState<string>('');
    async function handleSearch() {
        await searchClans(search, 1, 20);
        setSearch('')
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
                <div>
                    <span>Clan 1</span>
                    <span>3/20</span>
                </div>
            </div>
        </div>
    )
}
