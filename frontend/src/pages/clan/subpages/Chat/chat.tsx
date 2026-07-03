import s from './chat.module.scss'
import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { ClanOutletContext } from '../../clanOutletContext.type.ts';
import { getClanMessages, leaveClan } from '../../../../services/clans.ts';
import {
    getSocket,
    joinClanChatRoom, onNewMsg, sendClanMsg,
    socketDisconnect
} from '../../../../services/socket/clanChatSocket.ts';
import type { ClanMsg } from '@funcode/shared';
import { timeAgo } from '../../../../utils/timeAgo.ts';
import { useAuth } from '../../../../context/authContext.ts';

export function Chat() {
    const { myClan, refreshClanState } = useOutletContext<ClanOutletContext>();
    const { user } = useAuth();
    const clanName = myClan?.name;
    const clanDescription = myClan?.description;
    const [showClanInfo, setShowClanInfo] = useState(false);
    const [showLeavePopUp, setShowLeavePopUp] = useState(false);
    const [clanMsg, setClanMsg] = useState('');
    const [messages, setMessages] = useState<ClanMsg[]>([]);
    const [loadingOlder, setLoadingOlder] = useState<boolean>(false);
    const [hasMoreMessages, setHasMoreMessages] = useState(false);
    const chatRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const firstScrollDone = useRef(false);
    const leaveMsg = 'Do you really want to leave?';
    const messageLimit = 50;

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

    function handleSubmit() {
        const curMsg = clanMsg;
        setClanMsg('');
        sendClanMsg({ message: curMsg });
    }

    function updateHasMoreMessages(loadedCount: number) {
        setHasMoreMessages(loadedCount === messageLimit);
    }

    async function initialLoadMessages() {
        const clanMessages = await getClanMessages(messageLimit);
        updateHasMoreMessages(clanMessages.length);
        setMessages(clanMessages);
    }

    async function loadOlderMessages() {
        if (!chatRef.current || loadingOlder || !hasMoreMessages || messages.length === 0) return;

        setLoadingOlder(true);

        const oldestMessage = messages[0];
        const olderMessages = await getClanMessages(messageLimit, oldestMessage.messageId);

        updateHasMoreMessages(olderMessages.length);
        setMessages(prev => [...olderMessages, ...prev]);

        setLoadingOlder(false);
    }

    useEffect(() => {
        let isActive = true;
        let offNewMsg: (() => void) | undefined;

        async function joinClanChat() {
            await getSocket()
            if (!isActive) return;

            joinClanChatRoom(myClan?.clanId);
            await initialLoadMessages();
            offNewMsg = onNewMsg(handleNewMsg);
        }
        void joinClanChat();

        return () => {
            isActive = false;
            offNewMsg?.();
            void closeSocketConnection();
        }
    }, []);

    useEffect(() => {
        if (!bottomRef.current || messages.length == 0) return;
        bottomRef.current.scrollIntoView({behavior: firstScrollDone.current ? 'smooth' : 'auto'});
        firstScrollDone.current = true;
    }, [messages]);

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
            <div
                className={s.chat}
                ref={chatRef}
            >
                {hasMoreMessages && (
                    <button onClick={loadOlderMessages}>
                        Load older messages
                    </button>
                )}

                {messages.map((msg) => (
                    <div className={`${s.chatMsg} ${msg.userId === user?.userId ? s.ownMsg : ''}`}>
                        <div className={s.chatMsgTitle}>
                            <span>{msg.username}</span>
                            <span>{msg.clanRole}</span>
                        </div>
                        <div>
                            <span>{msg.msg}</span>
                        </div>
                        <div>
                            <span className={s.chatMsgTimeStamp}>{timeAgo(msg.createdAt)}</span>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef}></div>
            </div>
            <input value={clanMsg} onChange={(e) => setClanMsg(e.target.value)} className={s.chatInput} />
            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}
