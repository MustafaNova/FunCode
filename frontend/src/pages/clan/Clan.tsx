import s from './clan.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import type { ClanOutletContext } from './clanOutletContext.type.ts';
import { useEffect, useState } from 'react';
import { getMyClan } from '../../services/clans.ts';
import type { GetMyClanRes } from '@funcode/shared';

export function Clan() {
    const navigate = useNavigate();
    const [isInClan, setIsInClan] = useState<boolean | undefined>(undefined)
    const [myClan, setMyClan] = useState<GetMyClanRes | null | undefined>(undefined)
    async function loadMyClan() {
        const clan = await getMyClan();
        setMyClan(clan);
        setIsInClan(clan !== null);
    }

    async function refreshClanState() {
        await loadMyClan();
        navigate('/home/clan');
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void loadMyClan();
    }, [])

    if (isInClan === undefined || myClan === undefined) {
        return <div className={s.loadingScreen}>...loading</div>
    }

    const context: ClanOutletContext = { isInClan, refreshClanState, myClan }

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
