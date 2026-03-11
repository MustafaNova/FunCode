import s from './arena1v1.module.scss'
import { useState } from 'react';

type CancelSearch = {
    cancel: () => void
}

export function Arena1v1() {
    const [searching, setSearching] = useState(false);

    if (searching) {
        return <SearchingScreen cancel={() => setSearching(false)} />
    }

    return (
        <div className={s.container}>
            <button className={s.button} onClick={() => setSearching(true)}>CodeDuel</button>
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