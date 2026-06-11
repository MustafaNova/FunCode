import s from './clan.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import type { ClanOutletContext } from './clanOutletContext.type.ts';
import { useEffect, useState } from 'react';
import { isUserInClan } from '../../services/clans.ts';

export function Clan() {
    const navigate = useNavigate();
    const [isInClan, setIsInClan] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        async function loadIsInClan() {
            const res = await isUserInClan()
            setIsInClan(res)
        }
        void loadIsInClan();
    }, [])

    if (isInClan === undefined) {
        return <div className={s.loadingScreen}>...loading</div>
    }

    const context: ClanOutletContext = { isInClan }

    return (
        <div className={s.clanScreen}>
            {!isInClan && (
                <div className={s.btns}>
                    <button onClick={() => navigate('/home/clan/clans')}>Clans</button>
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
            <Outlet context={context} />
        </div>
    )
}
