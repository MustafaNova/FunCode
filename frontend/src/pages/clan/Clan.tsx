import s from './clan.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';

export function Clan() {
    const navigate = useNavigate();
    const isInClan = true
    return (
        <div className={s.clanScreen}>
            {!isInClan && (
                <div className={s.btns}>
                    <button onClick={() => navigate('/home/clan')}>Clans</button>
                    <button onClick={() => navigate('/home/clan/create')}>Create</button>
                    <button onClick={() => navigate('/home/clan/friends')}>Friends</button>
                </div>
            )}
            {isInClan && (
                <div className={s.btns}>
                    <button onClick={() => navigate('/home/clan/chat')}>Chat</button>
                    <button onClick={() => navigate('/home/clan/war')}>War</button>
                    <button onClick={() => navigate('/home/clan/friends')}>Friends</button>
                </div>
            )}

            <Outlet />
        </div>
    )
}