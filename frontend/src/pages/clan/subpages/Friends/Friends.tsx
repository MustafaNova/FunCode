import s from './friends.module.scss'
import { useAuth } from '../../../../context/authContext.ts';

export function Friends() {
    const { user, loading } = useAuth();
    const loadingInviteCodeMsg = 'Generating code...';
    const errorInviteCodeMsg = 'No invite code. Please try later';
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
                    <input/>
                    <button>send</button>
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

        </div>
    )
}