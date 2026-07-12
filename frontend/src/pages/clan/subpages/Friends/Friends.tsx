import s from './friends.module.scss'
import { useAuth } from '../../../../context/authContext.ts';
import { useEffect, useState } from 'react';
import { getIncomingFriendRequests, sendFriendReq } from '../../../../services/friends.ts';
import type { IncomingFriendRequestRes } from '@funcode/shared';
import { timeAgo } from '../../../../utils/timeAgo.ts';

export function Friends() {
    const { user, loading } = useAuth();
    const loadingInviteCodeMsg = 'Generating code...';
    const errorInviteCodeMsg = 'No invite code. Please reload the page';
    const [inviteCodeInput, setInviteCodeInput] = useState('');
    const [incomingFriendRequests, setIncomingFriendRequests] = useState<IncomingFriendRequestRes[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    function handleSendFriendReq() {
        void sendFriendReq({ inviteCode: inviteCodeInput });
        setInviteCodeInput('');
    }
    useEffect(() => {
        async function loadIncomingFriendRequests() {
            try {
                const res = await getIncomingFriendRequests();
                setIncomingFriendRequests(res);
            } finally {
                setIsLoading(false);
            }
        }
        void loadIncomingFriendRequests();
    }, []);

    return (
        <div className={s.flexColumn}>
            <button>Regenerate Invite Code</button>
            <div className={s.inviteFriendBox}>
                <span>Invite a Friend</span>
                <span>Create an Invite-Code and share it with your friends</span>
                <span>{loading ? loadingInviteCodeMsg : user?.inviteCode ?? errorInviteCodeMsg}</span>
            </div>
            <div className={s.joinBox}>
                <span>Enter an invite Code from your friend</span>
                <div>
                    <input
                        value={inviteCodeInput}
                        onChange={(e) => setInviteCodeInput(e.target.value)}
                    />
                    <button onClick={handleSendFriendReq}>send</button>
                </div>
            </div>
            <div className={s.friendsBox}>
                <div className={s.friendsTitle}>
                    <span>Your Friends (2)</span>
                    <input placeholder="Search Friends"/>
                </div>
                <div className={s.userBox}>User1</div>
                <div className={s.userBox}>User2</div>
            </div>
            <div className={s.incomingFriendRequests}>
                {isLoading ? (
                    <p>loading</p>
                ) : incomingFriendRequests.length === 0 ? (
                    <p>No friendRequests</p>
                ) : (
                    incomingFriendRequests.map((request) => (
                        <div className={s.friendReq}>
                            <span>{request.senderUsername}</span>
                            <span>{timeAgo(request.createdAt)}</span>
                            <div className={s.friendReqBtns}>
                                <button>accept</button>
                                <button>decline</button>
                            </div>
                        </div>
                    ))
                )

                }
            </div>

        </div>
    )
}