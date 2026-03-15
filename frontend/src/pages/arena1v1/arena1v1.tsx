import s from './arena1v1.module.scss'
import { useState } from 'react';
import { matchmakingCodeDuel } from '../../services/matchmaking.ts';

type CancelSearch = {
    cancel: () => void
}

export function Arena1v1() {
    const [searching, setSearching] = useState(false);

    const startDuelMatchMaking = () => {
        setSearching(true)
        matchmakingCodeDuel();
    }

    if (searching) {
        return <SearchingScreen cancel={() => setSearching(false)} />
    }

    return (
        <div className={s.container}>
            <button className={s.button} onClick={startDuelMatchMaking}>CodeDuel</button>
            <button className='notAvailable'>Bug Hunt</button>
            <button className='notAvailable'>Random Programming Language</button>
        </div>
    )
}


function SearchingScreen({ cancel }: CancelSearch) {
    return (
        <div className={s.searchingScreen}>
            <div>Searching for opponent...</div>
            <button className={s.button} onClick={cancel}>
                cancel
            </button>
        </div>
    )
}