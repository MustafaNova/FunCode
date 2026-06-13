import s from './chat.module.scss'
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import type { ClanOutletContext } from '../../clanOutletContext.type.ts';
import { leaveClan } from '../../../../services/clans.ts';

export function Chat() {
    const navigate = useNavigate();
    const { myClan, loadMyClan } = useOutletContext<ClanOutletContext>();
    const clanName = myClan?.name;
    const clanDescription = myClan?.description;
    const [showClanInfo, setShowClanInfo] = useState(false);
    const [showLeavePopUp, setShowLeavePopUp] = useState(false);
    const leaveMsg = 'Do you really want to leave?';

    async function handleYes() {
        await leaveClan()
        await loadMyClan()
        navigate('/home/clan')
    }

    return (
        <div className={s.chatScreen}>
            <button className={s.clanNameBtn} onClick={() => setShowClanInfo(true)}>{clanName}</button>

            {showClanInfo && (
                <div className={s.clanPopUp}>
                    <div className={s.titlePopUp}>
                        <h1>Clan</h1>
                        <button className={s.crossBtn} onClick={() => setShowClanInfo(false)}>x</button>
                    </div>
                    <span>{clanName}</span>
                    <span>{clanDescription}</span>
                    <button className={s.leaveBtn} onClick={() => setShowLeavePopUp(true)}>leave</button>
                </div>
            )}
            {showLeavePopUp && (
                <div className={s.leavePopUp}>
                    <div className={s.titlePopUp}>
                        <h1>Leave Clan?</h1>
                    </div>
                    <div className={s.leavePopUpContent}>
                        <span>{leaveMsg}</span>
                        <div className={s.leavePopUp_btns}>
                            <button onClick={() => setShowLeavePopUp(false)}>Cancel</button>
                            <button onClick={handleYes}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}