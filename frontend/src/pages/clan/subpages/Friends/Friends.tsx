import s from './friends.module.scss'

export function Friends() {
    return (
        <div className={s.flexColumn}>
            <button>Regenerate Invite Code</button>
            <div className={s.inviteFriendBox}>
                <span>Invite a Friend</span>
                <span>Create an Invite-Code and share it with your friends</span>
                <span>30MaDJWa</span>
            </div>
            <div className={s.joinBox}>
                <span>Join with Invite Code</span>
                <span>Enter an invite Code from your friend</span>
                <div>
                    <input/>
                    <button>Join</button>
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