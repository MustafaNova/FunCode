import s from './chat.module.scss'
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { ClanOutletContext } from '../../clanOutletContext.type.ts';
import { leaveClan } from '../../../../services/clans.ts';
import {
    getSocket,
    joinClanChatRoom, onNewMsg, sendClanMsg,
    socketDisconnect
} from '../../../../services/socket/clanChatSocket.ts';
import type { ClanMsg } from '@funcode/shared';

export function Chat() {
    const { myClan, refreshClanState } = useOutletContext<ClanOutletContext>();
    const clanName = myClan?.name;
    const clanDescription = myClan?.description;
    const [showClanInfo, setShowClanInfo] = useState(false);
    const [showLeavePopUp, setShowLeavePopUp] = useState(false);
    const [clanMsg, setClanMsg] = useState('');
    const [messages, setMessages] = useState<ClanMsg[]>([]);
    const leaveMsg = 'Do you really want to leave?';
    async function handleYes() {
        await leaveClan();
        await refreshClanState();
    }
    function handleNewMsg(msg: ClanMsg) {
        setMessages((prevMessages) => [...prevMessages, msg]);
    }
    async function closeSocketConnection() {
        await socketDisconnect();
    }

    useEffect(() => {
        let isActive = true;
        let offNewMsg: (() => void) | undefined;

        async function joinClanChat() {
            await getSocket()
            if (!isActive) return;

            joinClanChatRoom(myClan?.clanId);
            offNewMsg = onNewMsg(handleNewMsg)
        }
        void joinClanChat();

        return () => {
            isActive = false;
            offNewMsg?.();
            void closeSocketConnection();
        }
    }, []);

    function handleSubmit() {
        const curMsg = clanMsg;
        setClanMsg('');
        sendClanMsg(curMsg);
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
            <div className={s.chat}>
                {messages.map((msg) => (
                    <div className={s.chatMsg}>
                        <div className={s.chatMsgTitle}>
                            <span>Name</span>
                            <span>Role</span>
                        </div>
                        <div>
                            <span>{msg.msg}</span>
                        </div>
                        <div>
                            <span className={s.chatMsgTimeStamp}>{msg.createdAt}</span>
                        </div>
                    </div>
                ))}
            </div>
            <input value={clanMsg} onChange={(e) => setClanMsg(e.target.value)} className={s.chatInput} />
            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}
