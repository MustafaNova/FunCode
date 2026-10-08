import s from './matchMessages.module.scss';

type MatchMessagesProps = {
    myMessage: string | null;
    opponentMessage: string | null;
};

export function MatchMessages({myMessage, opponentMessage }: MatchMessagesProps) {
    return (
        <div className={s.messages}>
            <div className={s.player}>
                <span className={s.playerName}>You</span>

                {myMessage && (
                    <div className={s.message}>
                        {myMessage}
                    </div>
                )}
            </div>

            <div className={`${s.player} ${s.opponent}`}>
                <span className={s.playerName}>Opponent</span>

                {opponentMessage && (
                    <div className={s.message}>
                        {opponentMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
