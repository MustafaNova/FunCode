import s from './arena1v1.module.scss'
import { useState } from 'react';
import { leaveUnranked1v1, matchmakingUnranked1v1 } from '../../services/matchmaking.ts';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { SOCKET_EVENTS } from '@funcode/shared';

type CancelSearch = {
    cancel: () => void
}

export function Arena1v1() {
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();

    const startUnranked1v1 = async () => {
        setSearching(true)
        const socket: Socket = await matchmakingUnranked1v1();
        socket.on(SOCKET_EVENTS.MATCH_FOUND, () => {
            navigate('/match/ready');
            setSearching(false);
        });
    }
    const cancelUnranked1v1 = async () => {
        await leaveUnranked1v1()
        setSearching(false)
    }

    if (searching) {
        return <SearchingScreen cancel={cancelUnranked1v1} />
    }

    return (
        <div className={s.container}>
            <button className={s.button} onClick={startUnranked1v1}>unranked</button>
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