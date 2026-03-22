import s from './ready.module.scss'
import { onBattleStarted, sendPlayerReady } from '../../services/socket.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchStore } from '../../store/matchStore.ts';

export function ReadyScreen() {
    const navigate = useNavigate();
    const setMatchTask = useMatchStore((s) => s.setMatchTask);
    useEffect(() =>{
        return onBattleStarted((data) => {
            setMatchTask(data.task);
            navigate('/match')
        });
    }, [])


    return (
        <div className={s.readyScreen}>
            <button className={s.btn} onClick={sendPlayerReady}>Ready?</button>
        </div>
    )
}
