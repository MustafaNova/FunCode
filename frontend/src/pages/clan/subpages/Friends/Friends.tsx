import s from './friends.module.scss'
import { useAuth } from '../../../../context/authContext.ts';
import { useEffect, useState } from 'react';
import {
    acceptFriendRequest,
    getFriends,
    getIncomingFriendRequests,
    sendFriendReq
} from '../../../../services/friends.ts';
import type { GetFriendsRes, IncomingFriendRequestRes } from '@funcode/shared';
import { timeAgo } from '../../../../utils/timeAgo.ts';

export function Friends() {
    const { user, loading } = useAuth();
    const loadingInviteCodeMsg = 'Generating code...';
    const errorInviteCodeMsg = 'No invite code. Please reload the page';
    const [inviteCodeInput, setInviteCodeInput] = useState('');
    const [incomingFriendRequests, setIncomingFriendRequests] = useState<IncomingFriendRequestRes[]>([]);
    const [friends, setFriends] = useState<GetFriendsRes[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isGetFriendsLoading, setIsGetFriendsLoading] = useState<boolean>(true);
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

        async function loadFriends() {
            try {
                const res = await getFriends();
                setFriends(res);
            } finally {
                setIsGetFriendsLoading(false);
            }
        }

        void loadFriends();
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
                {isGetFriendsLoading ? (
                    <div className={s.red}>loading</div>)
                    : (<div>
                            <div className={s.friendsTitle}>
                                <span>Your Friends ({friends.length})</span>
                                <input placeholder="Search Friends"/>
                            </div>
                            {friends.map((friend) => (
                                <div className={s.userBox}>{friend.username}</div>
                            ))}
                    </div>)
                }

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
                                <button onClick={() => acceptFriendRequest(request.id)}>accept</button>
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