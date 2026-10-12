import s from './surrender.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFlag,
    faHouse,
    faShieldHalved,
    faCheck,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes.ts';

type SurrenderResultProps = {
    result: 'win' | 'lose';
};

export function SurrenderResult({ result }: SurrenderResultProps) {
    const navigate = useNavigate();
    const isWin = result === 'win';

    return (
        <main className={`${s.container} ${isWin ? s.win : s.lose}`}>
            <div className={s.backgroundGlow} aria-hidden="true" />

            <section className={s.resultCard}>
                <div className={s.topLine} />

                <div className={s.status}>
                    <span className={s.statusDot} />
                    BATTLE TERMINATED
                </div>

                <div className={s.iconContainer}>
                    <div className={s.iconRing}>
                        <FontAwesomeIcon icon={faFlag} />
                    </div>
                </div>

                <div className={s.content}>
                    <span className={s.eyebrow}>
                        {isWin
                            ? 'OPPONENT SURRENDERED'
                            : 'YOU SURRENDERED'}
                    </span>

                    <h1>
                        {isWin ? (
                            <>
                                YOU <span>WON</span>
                            </>
                        ) : (
                            <>
                                YOU <span>LOST</span>
                            </>
                        )}
                    </h1>

                    <p className={s.description}>
                        {isWin
                            ? 'Your opponent has surrendered. The battlefield is yours.'
                            : 'You surrendered the battle. Your opponent has been declared the winner.'}
                    </p>
                </div>

                <div className={s.resultBox}>
                    <div className={s.resultBoxIcon}>
                        <FontAwesomeIcon
                            icon={isWin ? faShieldHalved : faFlag}
                        />
                    </div>

                    <div className={s.resultBoxText}>
                        <span>MATCH RESULT</span>
                        <strong>
                            {isWin
                                ? 'Victory by Surrender'
                                : 'Defeat by Surrender'}
                        </strong>
                    </div>

                    <FontAwesomeIcon
                        icon={isWin ? faCheck : faXmark}
                        className={s.resultStatusIcon}
                    />
                </div>

                <button
                    type="button"
                    className={s.leaveButton}
                    onClick={() =>
                        navigate(ROUTES.HOME, { replace: true })
                    }
                >
                    <FontAwesomeIcon icon={faHouse} />
                    Return to Home
                </button>

                <span className={s.footer}>
                    MATCH COMPLETED
                </span>
            </section>
        </main>
    );
}