import s from './clan.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';

export function Clan() {
    const navigate = useNavigate();
    return (
        <div className={s.clanScreen}>
            <div className={s.btns}>
                <button onClick={() => navigate('/home/clan')}>Clans</button>
                <button onClick={() => navigate('/home/clan/create')}>Create</button>
            </div>
            <Outlet />
        </div>
    )
}